-- Adds the Eight Orbit Urban Farms case study to Supabase.
-- Run in Supabase -> SQL Editor. Safe to re-run: updates the row if it already exists.
-- Body mirrors content/case-studies/eight-orbit-urban-farms.html; re-generate this file if that HTML changes.
insert into medspa_case_studies (slug,name,cat,filter,tagline,img,body,published,ord,created_at) values ($cs_body$eight-orbit-urban-farms$cs_body$, $cs_body$Eight Orbit Urban Farms$cs_body$, $cs_body$Computer Vision$cs_body$, $cs_body$Agriculture$cs_body$, $cs_body$AI Crop Disease Detection & Real-Time Sensor Alerts at 1,500-Acre Scale$cs_body$, $cs_body$/eight-orbit-hero.jpg$cs_body$, $cs_body$<article class="cs-study">
<header class="cs-study-hero cs-study-hero--cover cs-study-hero--dark">
<img class="cs-study-hero__image" src="/eight-orbit-hero.jpg" alt="Drone surveying pesticide-free crop fields with disease segmentation overlays and sensor readings"/>
<span class="cs-study-hero__contrast" aria-hidden="true"></span>
<div class="cs-container">
<a class="cs-study-back" href="/#case-studies">← All case studies</a>
<p class="cs-study-label">Computer Vision · AgriTech IoT · Case study</p>
<h1>Eight Orbit Urban Farms</h1>
<p class="cs-study-kicker">AI Crop Disease Detection &amp; Real-Time Sensor Alerts at 1,500-Acre Scale</p>
<p class="cs-study-intro">CodeSquad built Eight Orbit a two-stage computer vision pipeline and a real-time threshold engine. Together they find crop disease, water stress and nutrient imbalance across 18 pesticide-free fields and alert farm managers before problems spread.</p>
<div class="cs-study-meta">
<span>Services</span>
<strong>Computer Vision · Threshold &amp; Alert Engines · IoT Data · Cloud Platform</strong>
</div>
<div class="cs-study-hero__cta">
<a class="cs-btn cs-btn--primary" href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener">Book a call <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></a>
</div>
</div>
</header>
<section class="cs-study-metrics" aria-label="Project highlights">
<div class="cs-container cs-study-metrics__grid">
<div><strong>1,500 acres</strong><span>18 active fields monitored by one platform</span></div>
<div><strong>2,100+ sensors</strong><span>Soil, weather and aerial telemetry, triaged automatically</span></div>
<div><strong>5 months</strong><span>Production MVP delivered in 10 Agile sprints</span></div>
</div>
</section>
<section class="cs-study-section">
<div class="cs-container cs-study-split">
<div class="cs-study-heading">
<span>The challenge</span>
<h2>No pesticides means no second chances.</h2>
</div>
<div class="cs-study-copy">
<div class="cs-study-narrative">
<div><p>Eight Orbit grows without pesticides, uses 95% less water than conventional farming and reaches up to 6x higher yields. When disease appears, it can’t spray the field. Its tools are isolation, irrigation and nutrition, and they work best while the problem is still small.</p></div>
<div><p>At 1,450–1,500 acres across 18 fields, manual scouting couldn’t keep up. By the time early blight or powdery mildew was visible to the eye, it had often already spread to neighboring plants.</p></div>
<div><p>The operation was designed to run 1,800–2,100 soil sensors, 22–45 weather sensors and 4–8 aerial crop health sensors. Without automated triage, a sudden moisture drop or a building nitrogen deficit was lost among thousands of normal readings.</p></div>
<div><p>Eight Orbit needed two things working together: visual diagnosis that names a disease and maps where it is, and real-time sensor triage that leaves managers with a short list of what to act on now.</p></div>
</div>
</div>
</div>
</section>
<section class="cs-study-section cs-study-section--ink cs-study-cv">
<div class="cs-container">
<div class="cs-study-heading cs-study-heading--wide">
<span>Deep dive 1 · Computer vision</span>
<h2>Two models: one names the disease, the other maps it.</h2>
</div>
<div class="cs-study-cv__grid">
<div class="cs-study-cv__copy">
<p class="cs-study-cv__lead">Drone imagery flows <b>S3 → AI → results → portal</b>. A classifier identifies the disease, and a segmentation model draws its exact boundary in the field.</p>
<ol class="cs-study-cv__steps">
<li><b>Capture</b><p>Drones carry MicaSense RedEdge multispectral and FLIR Vue TZ20 thermal cameras, alongside standard RGB crop imagery.</p></li>
<li><b>Ingest</b><p>Every image and video lands in AWS S3, traceable to its field, flight and capture time.</p></li>
<li><b>Classify</b><p>EfficientNetB5 reads high-resolution RGB images and labels specific diseases such as Blight and Powdery Mildew.</p></li>
<li><b>Segment</b><p>A UNet with a ResNet backbone processes multispectral and RGB imagery into pixel-level masks of the diseased areas.</p></li>
<li><b>Surface</b><p>Labels, confidence scores and masks appear in the portal, and new disease regions go straight to the alert engine.</p></li>
</ol>
</div>
<figure class="cs-study-cv__media cs-study-cv__media--data">
<div class="cs-study-table-wrap">
<table class="cs-study-table cs-study-table--wrap">
<thead><tr><th scope="col">Input</th><th scope="col">Signal</th></tr></thead>
<tbody>
<tr><th scope="row">MicaSense RedEdge</th><td>Red-edge &amp; NIR vigor changes</td></tr>
<tr><th scope="row">FLIR Vue TZ20</th><td>Canopy temperature / water stress</td></tr>
<tr><th scope="row">RGB imagery</th><td>Lesion &amp; coating patterns</td></tr>
</tbody>
</table>
</div>
<div class="cs-study-table-wrap">
<table class="cs-study-table cs-study-table--wrap">
<thead><tr><th scope="col">Model</th><th scope="col">Answers</th></tr></thead>
<tbody>
<tr><th scope="row">EfficientNetB5</th><td>What disease is it?</td></tr>
<tr><th scope="row">UNet + ResNet</th><td>Exactly where is it?</td></tr>
</tbody>
</table>
</div>
<figcaption><span class="cs-study-cv__dot" aria-hidden="true"></span>Classification without segmentation can’t say which rows to treat. Segmentation without classification can’t say what the problem is.</figcaption>
</figure>
</div>
</div>
</section>
<section class="cs-study-section cs-study-section--ink cs-study-cv">
<div class="cs-container">
<div class="cs-study-heading cs-study-heading--wide">
<span>Deep dive 2 · Threshold &amp; alert engine</span>
<h2>Thousands of readings, cut down to a few clear actions.</h2>
</div>
<div class="cs-study-cv__grid">
<div class="cs-study-cv__copy">
<p class="cs-study-cv__lead">Telemetry flows <b>Field API → time-series → stats</b>, then <b>thresholds → dashboard notifications</b>. Django APIs and async background workers do the evaluation.</p>
<ol class="cs-study-cv__steps">
<li><b>Ingest</b><p>Soil and weather sensors from several vendors report through one Field API, normalized into a single schema.</p></li>
<li><b>Aggregate</b><p>Readings are stored as time-series and rolled up into PostgreSQL statistics: rolling averages, rates of change and per-field trends.</p></li>
<li><b>Forecast</b><p>LightGBM, Random Forest and GBM models forecast soil moisture and rainfall from the sensor and weather history.</p></li>
<li><b>Evaluate</b><p>Background workers check live stats, CV disease masks and forecasts against strict agronomy thresholds.</p></li>
<li><b>Alert</b><p>When a threshold is crossed, an alert naming the field, the trigger and the data behind it is pushed to the manager’s dashboard.</p></li>
</ol>
</div>
<figure class="cs-study-cv__media cs-study-cv__media--data">
<div class="cs-study-table-wrap">
<table class="cs-study-table cs-study-table--wrap">
<thead><tr><th scope="col">Hardware</th><th scope="col">Measures</th></tr></thead>
<tbody>
<tr><th scope="row">Decagon EC-5</th><td>Soil moisture</td></tr>
<tr><th scope="row">Yara N-Tester</th><td>NPK nutrients</td></tr>
<tr><th scope="row">PT1000</th><td>Soil temperature</td></tr>
<tr><th scope="row">Davis Vantage Pro2</th><td>Weather station</td></tr>
<tr><th scope="row">Campbell Sci. ARG100</th><td>Rainfall</td></tr>
</tbody>
</table>
</div>
<div class="cs-study-table-wrap">
<table class="cs-study-table cs-study-table--wrap">
<thead><tr><th scope="col">Trigger</th><th scope="col">Alert</th></tr></thead>
<tbody>
<tr><th scope="row">Sudden moisture drop</th><td>Irrigate (no rain forecast)</td></tr>
<tr><th scope="row">NPK imbalance</th><td>Targeted fertilization</td></tr>
<tr><th scope="row">Early blight mask</th><td>Inspect &amp; isolate</td></tr>
</tbody>
</table>
</div>
<figcaption><span class="cs-study-cv__dot" aria-hidden="true"></span>Forecasts let the engine tell a dry spell that needs water now from one that incoming rain will fix.</figcaption>
</figure>
</div>
</div>
</section>
<section class="cs-study-section">
<div class="cs-container">
<div class="cs-study-heading cs-study-heading--wide">
<span>Platform &amp; production hardening</span>
<h2>Built to keep working in the field.</h2>
</div>
<div class="cs-study-icons">
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18M7 15l4-4 3 3 5-6"></path></svg></span>
<h3>Dashboard</h3>
<p>React + TypeScript: Soil Health Score (92/100), NPK bars, yield (28 t/ha), precipitation vs. moisture</p>
</div>
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"></path></svg></span>
<h3>Data</h3>
<p>Django APIs over PostgreSQL time-series stats, with raw imagery and model artifacts in AWS S3</p>
</div>
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="1.5"></rect><rect x="3" y="14" width="18" height="6" rx="1.5"></rect><path d="M7 7h.01M7 17h.01"></path></svg></span>
<h3>Compute</h3>
<p>Containerized services on AWS ECS/EC2, so APIs, workers and inference scale independently</p>
</div>
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h4l3-8 4 16 3-8h6"></path></svg></span>
<h3>Monitor</h3>
<p>CloudWatch shows ingestion lag, worker backlogs and failed jobs before they affect alerts</p>
</div>
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg></span>
<h3>Secure</h3>
<p>TLS encryption in transit and role-based access for field staff, agronomists and management</p>
</div>
<div class="cs-study-icons__item">
<span class="cs-study-icons__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"></path></svg></span>
<h3>Ship</h3>
<p>Full CI/CD across Dev, Staging and Production, so model and threshold changes are tested first</p>
</div>
</div>
</div>
</section>
<section class="cs-study-section cs-study-section--ink">
<div class="cs-container">
<div class="cs-study-heading cs-study-heading--wide">
<span>Execution roadmap</span>
<h2>Five milestones, ten sprints, five months.</h2>
<p>Each milestone delivered a working, demonstrable piece of the system.</p>
</div>
<div class="cs-study-table-wrap">
<table class="cs-study-table cs-study-table--wrap">
<thead><tr><th scope="col">Milestone</th><th scope="col">Sprints</th><th scope="col">Delivered</th></tr></thead>
<tbody>
<tr><th scope="row">M1 · Core System</th><td>1–2</td><td>Django, PostgreSQL, Field API, time-series pipeline, AWS &amp; CI/CD</td></tr>
<tr><th scope="row">M2 · AI Disease Detection &amp; Forecasting</th><td>3–4</td><td>EfficientNetB5, UNet + ResNet, LightGBM / RF / GBM</td></tr>
<tr><th scope="row">M3 · Drone Integration</th><td>5–6</td><td>MicaSense &amp; FLIR imagery via S3 into inference</td></tr>
<tr><th scope="row">M4 · Complete Dashboard</th><td>7–8</td><td>React + TypeScript portal with live alerts</td></tr>
<tr><th scope="row">M5 · Testing &amp; Pilot Deployment</th><td>9–10</td><td>End-to-end testing, threshold tuning, pilot rollout</td></tr>
</tbody>
</table>
</div>
</div>
</section>
<section class="cs-study-section cs-study-quote">
<div class="cs-container">
<div class="cs-study-conclusion">
<span>Impact</span>
<div class="cs-study-narrative cs-study-narrative--dark">
<div><p><b>Proactive irrigation.</b> Moisture alerts combined with rainfall forecasts tell managers which fields need water and which incoming rain will cover. Eight Orbit’s water-efficient model depends on that precision.</p></div>
<div><p><b>Targeted fertilization.</b> NPK monitoring flags imbalances field by field, so nutrients go only where the data shows a deficit.</p></div>
<div><p><b>Zero-pesticide containment.</b> Named diseases with pixel-level boundaries let crews isolate early blight and powdery mildew while outbreaks are still small enough to contain without chemicals.</p></div>
<div><p><b>One operational picture.</b> Drone imagery, soil telemetry, weather and forecasts appear on one dashboard, with the system deciding what needs attention first.</p></div>
</div>
</div>
</div>
</section>
<section class="cs-study-section">
<div class="cs-container">
<div class="cs-study-heading cs-study-heading--wide">
<span>FAQ</span>
<h2>Common questions.</h2>
</div>
<div class="cs-faq">
<details class="cs-faq__item"><summary>Does this only work for agriculture?</summary><p>No. The same pattern applies anywhere images and sensor data arrive faster than people can review them: classify the defect, segment where it is, then check it against thresholds and alert the right person. That includes manufacturing inspection and infrastructure monitoring.</p></details>
<details class="cs-faq__item"><summary>Can it work with the sensors and cameras we already have?</summary><p>Yes. The Field API normalizes readings from different vendors into one schema, so new hardware is added as an adapter rather than a rebuild.</p></details>
<details class="cs-faq__item"><summary>Who sets the alert thresholds?</summary><p>Thresholds are agronomy rules defined with your domain experts and tuned during the pilot. They’re configured and promoted through Dev, Staging and Production like any other change.</p></details>
<details class="cs-faq__item"><summary>How long did it take?</summary><p>A production-hardened MVP in 5 months, delivered in 10 Agile sprints across 5 milestones.</p></details>
</div>
</div>
</section>
<section class="cs-study-cta">
<div class="cs-container">
<p>Images and sensor data piling up faster than your team can review them?</p>
<h2>Let’s turn them into decisions your team acts on.</h2>
<div class="cs-study-cta__actions">
<a class="cs-btn cs-btn--primary" href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener">Book a call <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></a>
<a class="cs-btn cs-btn--ghost" href="/inquiry">Send an inquiry</a>
</div>
</div>
</section>
</article>$cs_body$, true, 8, now())
on conflict (slug) do update set name=excluded.name, cat=excluded.cat, filter=excluded.filter, tagline=excluded.tagline, img=excluded.img, body=excluded.body, published=excluded.published, updated_at=now();
