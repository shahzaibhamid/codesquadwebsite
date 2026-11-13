# Eight Orbit Urban Farms: AI Crop Disease Detection and Real-Time Sensor Alerts Across 1,500 Pesticide-Free Acres

How CodeSquad AI Solutions engineered a dual-stage computer vision pipeline and an automated threshold-and-alert engine that let a pesticide-free farming operation find crop disease, water stress and nutrient imbalance before they spread.

---

| | |
|---|---|
| **Client** | Eight Orbit Urban Farms |
| **Industry** | Agriculture / AgriTech, sustainable pesticide-free farming (Africa) |
| **Scale** | 1,450–1,500 acres across 18 active fields |
| **Sensor fleet** | 1,800–2,100 soil sensors · 22–45 weather sensors · 4–8 aerial crop health sensors |
| **Timeline** | 5-month MVP: 10 Agile sprints across 5 milestones |
| **Core services** | Computer Vision for Defect & Disease Classification · Automated Threshold & Alert Engines · IoT Data Engineering · Full-Stack Platform Development · Cloud Infrastructure & DevOps |
| **AI / ML** | EfficientNetB5 (disease classification) · UNet with ResNet backbone (segmentation) · LightGBM, Random Forest, GBM (tabular forecasting) |
| **Field hardware** | MicaSense RedEdge (multispectral) · FLIR Vue TZ20 (thermal) · Decagon EC-5 · Yara N-Tester · PT1000 · Davis Vantage Pro2 · Campbell Scientific ARG100 |
| **Platform** | Django · PostgreSQL · React + TypeScript · AWS S3 · AWS ECS/EC2 · CloudWatch · TLS · RBAC · CI/CD (Dev / Staging / Production) |

---

## Executive Summary

Eight Orbit Urban Farms grows without pesticides, uses 95% less water than conventional farming and reaches up to 6x higher yields. That model only works if problems are caught early, because the usual fallback of spraying the field isn't available. CodeSquad AI Solutions built the intelligence layer that makes early detection practical across 1,500 acres. Drone-mounted multispectral and thermal cameras feed a two-stage computer vision pipeline: **EfficientNetB5** identifies which disease is present, and a **UNet with a ResNet backbone** maps exactly where it is, down to the pixel. In parallel, telemetry from more than 2,000 soil and weather sensors goes into a Django-based threshold engine. That engine checks live readings, disease masks and **LightGBM** moisture and rainfall forecasts against agronomy rules, then sends actionable alerts to a React + TypeScript dashboard. The system was delivered as a production-hardened MVP on AWS in five months. It turns raw field data into specific decisions: irrigate this block, adjust nutrients in that field, isolate this patch of early blight.

---

## The Challenge: Protecting Pesticide-Free Yields at Scale

Eight Orbit's commitment to pesticide-free farming changes how disease has to be managed. A conventional farm can treat a whole field broadly once an outbreak shows up. Eight Orbit can't. Its tools are agronomic: removing or isolating affected plants, adjusting irrigation and nutrients, and changing growing conditions. All of these work best when the problem is still small, and they lose effectiveness quickly once it isn't.

The scale made that hard to do by hand:

- **1,450–1,500 acres across 18 active fields.** Walking every row to spot early blight or powdery mildew is slow and inconsistent. By the time symptoms are visible to a scout, the infection has often moved to neighboring plants.
- **Thousands of data points arriving all the time.** The operation was designed to run 1,800–2,100 soil sensors, 22–45 weather stations and rain gauges, and 4–8 aerial crop health sensors. Without automated triage, that volume of telemetry becomes noise. A sudden drop in moisture in one field, or a nitrogen deficit building in another, gets lost among thousands of normal readings.
- **Resource efficiency is part of the business model.** The 95% water reduction depends on irrigating precisely when and where the soil needs it. Nutrient decisions have to be just as targeted. Reacting late wastes water and fertilizer, and it costs yield.

Eight Orbit needed two capabilities that worked together. The first was **automated visual diagnosis**: identify the disease and show exactly where it is. The second was **real-time sensor triage**: turn a constant stream of soil, weather and forecast data into a short list of things a farm manager has to act on now.

---

## Engineering Deep-Dive 1: Dual-Stage Computer Vision for Disease Diagnostics

### Image acquisition: three ways of looking at a crop

The vision pipeline uses three complementary image sources, each picking up a different signal of crop stress:

| Sensor | What it captures | Why it matters |
|---|---|---|
| **MicaSense RedEdge** (drone-mounted multispectral) | Narrow-band reflectance including red-edge and near-infrared | Chlorophyll and canopy-vigor changes often show up in these bands before stress is visible to the eye |
| **FLIR Vue TZ20** (drone-mounted thermal) | Canopy surface temperature | Thermal anomalies point to water stress and disrupted transpiration in affected plants |
| **Standard RGB imagery** | High-resolution visible-spectrum crop images | The lesion, spotting and coating patterns that distinguish one disease from another |

### Ingestion and routing: `S3 → AI → results → portal`

Every image and video captured in the field lands in **AWS S3**, which acts as the system of record for raw imagery. Uploads are organized so each asset can be traced to its field, flight and capture time. From S3, assets are passed to the inference stage. Results (class labels, confidence scores and segmentation masks) are written back and linked to the source imagery, then surfaced in the farm manager's portal. Keeping raw imagery, model outputs and the dashboard as separate stages means each one can scale or be re-run without disturbing the others. For example, historical imagery can be re-processed when a model is retrained.

### Stage 1: Classification with EfficientNetB5

The first stage answers the question **what is wrong with this plant?**

RGB crop images go to an **EfficientNetB5** classifier that detects and labels specific diseases such as **Blight** and **Powdery Mildew**. The EfficientNet family scales network depth, width and input resolution together. The B5 variant was chosen for its high input resolution, which preserves the fine texture detail that separates one disease's lesions from another's or from harmless discoloration, while keeping inference cost manageable on a fleet-wide image volume.

### Stage 2: Segmentation with UNet + ResNet backbone

The second stage answers **exactly where is it, and how far has it spread?**

A **UNet with a ResNet backbone** processes multispectral and RGB imagery and outputs **pixel-level segmentation masks** that mark the spatial boundaries of diseased crop areas. The ResNet encoder extracts deep features from the imagery, and UNet's decoder with skip connections rebuilds them at full resolution, so the edges of an infected patch stay sharp instead of blurring into the surrounding canopy. Because the model also uses multispectral bands, it can pick out stressed tissue at the margins of an outbreak that would be hard to isolate from RGB alone.

### Why two stages work better than one

Each model covers what the other can't:

- **Classification without segmentation** says that a field has blight, but not which rows need attention.
- **Segmentation without classification** shows a stressed area, but not whether it's a pathogen, a water problem or a nutrient deficiency, which determines the right response.

Together, they produce an output a farm manager can act on: **a named disease, with a mapped boundary, in a specific field**. That's what makes pesticide-free containment possible. Crews can isolate a defined patch of early blight while it's still small, before it reaches neighboring plants.

The segmentation masks also feed the second system. A newly detected disease region becomes one of the signals the alert engine evaluates.

---

## Engineering Deep-Dive 2: The Real-Time Threshold & Alert Engine

### IoT ingestion: `Field API → time-series → stats`

Ground-truth telemetry comes from a mixed hardware fleet:

| Domain | Hardware | Measurement |
|---|---|---|
| Soil | **Decagon EC-5** | Volumetric soil moisture |
| Soil | **Yara N-Tester** | Crop nitrogen status, used in NPK nutrient tracking |
| Soil | **PT1000** | Soil temperature |
| Weather | **Davis Vantage Pro2** | Full weather station data (temperature, humidity, wind, rainfall and more) |
| Weather | **Campbell Scientific ARG100** | Rainfall, via tipping-bucket rain gauges |

All of these devices report through a single **Field API**, which normalizes readings from different vendors into one schema. Readings are written as **time-series** data and rolled up into **statistics** (rolling averages, rates of change and per-field aggregates) stored in **PostgreSQL**. This aggregation step matters at a fleet size of 2,000+ sensors. The engine evaluates trends such as "moisture in Field 7 has fallen sharply over the last few hours", not individual noisy data points.

### Predictive context: LightGBM, Random Forest and GBM

Current readings only describe the present. To let managers act ahead of problems, CodeSquad added tabular forecasting models (**LightGBM, Random Forest and GBM**) trained on the sensor and weather history to **forecast soil moisture and rainfall**. Gradient-boosted tree models suit this kind of structured, multi-variable sensor data and are fast to retrain as each season adds more history. The forecasts become inputs to the alert engine. That lets it tell apart a moisture drop that needs irrigation now from one that forecast rainfall will correct anyway.

### The evaluation layer: Django APIs and asynchronous workers

The core of the engine is a set of **Django APIs and asynchronous background workers**. They continuously evaluate three kinds of input against strict agronomy thresholds:

1. **Real-time sensor statistics**: moisture, NPK and temperature trends from the time-series layer
2. **Computer vision disease masks**: newly detected or expanding disease regions from the segmentation model
3. **LightGBM forecasts**: predicted soil moisture and rainfall

Moving this evaluation into background workers keeps the API and dashboard responsive while thousands of readings and every new image batch are processed continuously.

### From raw data to action: `Thresholds → dashboard notifications`

When an input crosses a threshold, the engine raises an alert and **pushes it immediately to the farm manager's dashboard**. Examples:

- **Sudden moisture drop**: EC-5 readings in a field fall faster than expected and the forecast doesn't show rain coming, so the field is flagged for irrigation.
- **NPK imbalance**: nitrogen and nutrient readings move outside the target range for the crop, so a targeted fertilization alert is raised for that field.
- **Early blight segmentation**: the vision pipeline maps a new blight region, so the affected area is flagged for inspection and isolation.

Each alert names the field, the trigger and the data behind it, so the manager can act on it directly instead of first investigating raw readings.

### The farm manager's view: React + TypeScript dashboard

All of this comes together in an interactive **React + TypeScript** web dashboard built for daily operational use:

- **Soil Health Score** (e.g. **92/100**): a single at-a-glance measure of field condition
- **NPK grouped bar charts**: nitrogen, phosphorus and potassium levels compared side by side across fields
- **Yield over time** (e.g. **28 tons/hectare**): production trends across the operation
- **Precipitation vs. moisture charts**: rainfall plotted against soil moisture response, which is what irrigation decisions are based on
- **Live alert notifications** from the threshold engine, alongside the disease detections and segmentation maps from the vision pipeline

---

## System Architecture & Production Hardening

Field systems have to keep working through busy flight days, bursts of telemetry and patchy connectivity. CodeSquad built the platform to production standards from the first sprint:

- **Compute:** containerized services on **AWS ECS/EC2**, so API servers, background workers and inference workloads scale independently
- **Data:** **PostgreSQL** for relational and time-series aggregates, and **AWS S3** for raw imagery, video and model artifacts
- **Observability:** **AWS CloudWatch** monitoring across services, so ingestion lag, worker backlogs and failed jobs are visible before they affect alerts
- **Security:** **TLS encryption** in transit and **Role-Based Access Control (RBAC)**, so field staff, agronomists and management each see the data and controls their role needs
- **Delivery:** full **CI/CD** across separate **Dev, Staging and Production** environments, so model updates and threshold changes are tested before they reach the live farm

---

## The 5-Month Execution Roadmap & Impact

CodeSquad delivered the MVP in **10 Agile sprints across 5 milestones**. Each milestone produced a working, demonstrable piece of the system.

| Milestone | Sprints | Delivered |
|---|---|---|
| **M1: Core System** | 1–2 | Django backend, PostgreSQL, Field API, sensor ingestion and time-series pipeline, AWS foundation and CI/CD |
| **M2: AI Disease Detection & Forecasting** | 3–4 | EfficientNetB5 classification, UNet + ResNet segmentation, LightGBM / RF / GBM moisture and rainfall forecasting |
| **M3: Drone Integration** | 5–6 | MicaSense RedEdge and FLIR Vue TZ20 imagery ingested via S3 into the inference pipeline |
| **M4: Complete Dashboard** | 7–8 | React + TypeScript dashboard: Soil Health Score, NPK charts, yield and precipitation-vs-moisture views, live alerts |
| **M5: Testing & Pilot Deployment** | 9–10 | End-to-end testing, threshold tuning, production hardening and pilot rollout in the field |

### Operational outcomes for farm managers

- **Proactive irrigation.** Moisture alerts combined with rainfall forecasts tell managers which fields need water and which will be covered by incoming rain. That precision is what Eight Orbit's water-efficient model relies on.
- **Targeted fertilization.** NPK monitoring flags imbalances per field, so nutrients go only where the data shows a deficit, instead of being applied across the whole operation.
- **Zero-pesticide disease containment.** Named diseases with pixel-level boundaries let crews isolate early blight and powdery mildew while outbreaks are still small enough to contain without chemicals.
- **One operational picture.** Imagery, soil telemetry, weather and forecasts that used to sit in separate systems now appear on one dashboard, with the system deciding what needs attention first.

---

## Build Your Own Field Intelligence System

Eight Orbit's platform shows what's possible when computer vision, IoT telemetry and predictive models are engineered as one system instead of separate tools. CodeSquad AI Solutions designs and ships custom AI systems from hardware integration to the production dashboard: **computer vision for defect and disease detection, real-time threshold and alert engines, sensor data pipelines and the cloud infrastructure underneath them**. Whether you inspect crops, products or infrastructure, if your operation produces images and sensor data faster than people can review them, we can turn that data into decisions your team acts on.

**[Book a call](https://calendly.com/code_squad/30min)** or **[send an inquiry](https://www.codesquad.ai/inquiry)** to scope your project.
