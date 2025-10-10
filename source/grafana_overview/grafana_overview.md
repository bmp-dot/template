# Grafana Overview

## Slide 1–2: Demystifying WEKA Observability + Why Observability Matters

Observability is essential for understanding the behavior and health of a WEKA cluster. R&D engineers rely on detailed visibility to evaluate performance, identify emerging issues, and ensure the system operates as expected.
WEKA provides several observability tools that expose data across multiple layers, from high-level dashboards to raw metrics. Together, these tools make it possible to analyze how the cluster performs over time and under different workloads.

A simple “OK” status may confirm that a cluster is running, but it does not reveal the complete picture. Subtle performance changes, such as increasing latency for a single application or slower performance on a specific drive, can signal developing issues. Detecting and interpreting these trends requires deep observability and continuous monitoring of the underlying metrics.

## Slide 3: WEKA Home & Data Journey

A WEKA cluster produces a continuous stream of operational data, including statistics, events, and metrics. Understanding the health of a cluster depends on interpreting this data rather than treating it as a simple “up” or “down” state.

The process begins with understanding where the data comes from and how it flows. All information is collected by WEKA Home, a centralized system designed to gather, store, and process cluster data. It acts as an analytics hub, providing visibility into performance and health.

In a standard configuration, data flows directly from the cluster to an API endpoint. A service called stats-handler receives and processes the incoming statistics, writing them to a Victoria Metrics database. Grafana connects to this database to present the time series data as dashboards and visual reports in WEKA Home.

WEKA operates multiple Grafana instances for various internal and customer facing environments. The primary interface for most users is Cloud WEKA Home, which contains aggregated cluster statistics and system metrics. Some organizations prefer to deploy a local WEKA Home instance, keeping all data within their own infrastructure. In that case, WEKA does not have access to the telemetry.

Through this architecture, WEKA Home enables consistent data visibility and health monitoring across all clusters. By reading and interpreting these metrics, administrators can identify performance patterns, detect anomalies, and maintain cluster reliability with data-driven insight.

## Slide 4: Prometheus Metrics – Counter

Once data reaches WEKA Home, it is stored and represented using the Prometheus open-source standard for metrics. Prometheus records information as time series data, meaning it tracks how each value changes over time. This approach enables precise visibility into trends, performance patterns, and rate-based analysis.

One of the core Prometheus metric types is the Counter. A Counter measures values that only increase, such as the total number of read operations or bytes written since a service started. It resets to zero only when the underlying service restarts. This makes Counters useful for tracking cumulative activity and identifying long term growth or workload patterns within a WEKA cluster.

## Slide 5: Prometheus Metrics – Gauge

The second primary metric type is the Gauge. Unlike a Counter, a Gauge represents a value that can both increase and decrease over time. It captures the current state of a measurement at a specific moment. Examples include CPU utilization, drive temperature, and the number of active processes. Gauges are useful for tracking real-time system behavior and observing short-term fluctuations in cluster performance.

## Slide 6: Metric Mistakes – rate() on Gauge Trap

Functions can be applied to metrics to derive more meaningful insights. One of the most common and important is the rate() Function. This Function converts a monotonically increasing Counter into a per-second rate, such as requests per second or bytes written per second.

It is important to apply rate() only to Counters. Using it on a Gauge, such as CPU utilization or temperature, produces invalid and noisy results because a gauge already represents a single point-in-time value.

In general, the Function should always match the metric type. Use rate() or increase() with counters to calculate rates or deltas over time. For Gauges, query the values directly, or use Functions such as avg_over_time() to observe trends and averages within a defined time window.

## Slide 7: Dashboards and Exploring Like a Pro

While raw metrics provide complete data, they are not always easy to interpret directly. Grafana addresses this challenge by transforming time-series data into clear, interactive dashboards.

When accessing the Performance Statistics page for a cluster, the first view displayed is the Home Dashboard. By default, it presents a six hour overview of cluster activity, offering immediate context about recent performance and current system state.

Simple visualizations can often provide the most direct insight. For example, the Alerts Counter panel displays the current number of active alerts. This value should remain at zero; any nonzero count indicates an issue that requires attention.

Other dashboards visualize component health and system utilization. A bar gauge can use the weka_cluster_drives_count metric to display the number of active drives, allowing a quick comparison between expected and actual values.

Beyond simple counts, Grafana dashboards provide detailed time-series visualizations for performance metrics such as IOPS, throughput, and latency. Latency data is shown by percentile, making it possible to detect transient spikes or tail latency events that may not appear in average measurements. These visualizations enable a comprehensive understanding of cluster behavior and help identify performance deviations at a glance.

## Slide 7 (Explore section)

Pre-built dashboards in Grafana address most common monitoring needs, but some situations require a more detailed or customized analysis. When a specific question falls outside of existing panels, the **Explore** view provides direct access to the raw metric data.

The Explore pane allows interactive querying and visualization of metrics stored in Victoria Metrics. It is used for targeted investigations, troubleshooting, and hypothesis testing when deeper insight into cluster behavior is needed.


#### Lab

To begin, open Explore, ensure the data source is set to Victoria Metrics, and enter the name of the metric of interest—for example, **ops_driver.read_bytes**. Labels such as **cluster_guid** can be applied to narrow the results to a specific cluster or component.

Both the graph and the raw data points can be analyzed directly. For instance, querying **fs_stats.write_bytes** displays the per-node write activity. If this counter does not change over time, it indicates that no write operations occurred on that node during the observed period.

The Explore view complements the standard dashboards by providing flexibility and precision, enabling engineers to investigate issues beyond predefined visualizations.

## Slide 8: The Keys to the Kingdom

In summary, understanding WEKA observability begins with understanding how data is collected, stored, and visualized. The data flow from each cluster into WEKA Home provides a foundation for monitoring and analysis. Core Prometheus metric types such as Counters and Gauges define how values are tracked over time, while Grafana offers tools to interpret those metrics—whether through predefined dashboards or custom queries in the Explore view.

Together, these components form a complete framework for observing and understanding cluster behavior. By interpreting the data effectively, engineers can identify trends, diagnose issues, and gain deeper insight into the performance and health of their WEKA clusters.


