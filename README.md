
Deploying a website 3 ways series Pt1: A Load Balanced, Autoscaling, Lamp Stack


Goal:
This guide will walk you through the deployment of an *N*-Tier Web Application, hosted on one of the following Cloud Providers

* Azure
* Google Cloud Platform
* Amazon Web Services (TODO)


The following components are provided and are fully composable, and can be selected based on your preference and need:

* A compute instance (VM) example that offers the following features:
    - Can be standalone or part of a load balanced set of systems 
    - Can be used for either presentation or business logic layers of the deployment
    - Support for auto-scaling is written today for Google Cloud, coming to the others soon
* A hosted DB provided from the respective cloud provider
* A hosted load balancer from the respective cloud provider


You can selectively choose which components you’d like to leverage. A few examples:
 - If you merely need to host a simple website that does not retrieve data, select just the presentation layers
 - If your application does not require a separate system for business logic, you can use just the presentation layer and database
 
 The purposes of this guide are to discuss each section as a composable component of the larger whole. So if you run and complete the steps for each cloud providers section, you will end up with a load balanced, 3-tier website with the following attributes:
 - A load balanced presentation layer
 - A single business logic system to retrieve data
 - A hosted database in which to store your data

To wrap up, we’ll provide a sample application for use that highlights configuration of the systems and hosted services across each cloud provider. 
The examples are structured based on the chosen cloud provider. Although all providers and examples provide similar functionality, they are matched to a single cloud provider.