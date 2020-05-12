---
id: presentation
title: Presentation Layer
sidebar_label: Presentation Layer
---
In common software architecture patterns, the presentation layer is responsible for handling the user interface (UI), and is most commonly associated with how humans are presented with data stored and retrieved from other layers in the application.

For this example, the most common pattern for the presentation layer is a webserver, running on one or more virtual machines. Public cloud providers offer some handy ways of ensuring there is always at least 1 of your system available to handle requests, and can even scale based off some built in metrics to increaase or decrease capacity as needed.

In order for us to have consistent uptime with this application, we'd like to have:
* A loadbalancer to handle and route requests to our web app
* A pool of virtual machines that dynamically scales to our users needs

To make that happen, we'll need to configure:
1. A load balancer to help route traffic
2. Some type of capability for automatically scaling vm instances as needed
   a. A consitently configured machine image that can be rapidly deployed -- often referred to as a machine or instance template
3. A metric to increase or decrease sets

Each cloud provider covered in this guide provides these components, it's just a matter of reviewing their documentation and materials to learn how each is associated together.

