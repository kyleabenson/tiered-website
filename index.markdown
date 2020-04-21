---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
Deploying a website 3 ways series Pt1: A Load Balanced, Autoscaling, Lamp Stack


Goal:
This guide will walk you through an Ansible collection, which allows you to provision a simple webapp with the following features:

* A loadbalancer provided by the respective cloud provider
* A frontend web application
* A basic middleware router to retrieve DB data
* A hosted DB provided by the respective cloud provider

This style will let us use Ansible to interact with different types of offerings from cloud providers, rather than just traditional VM instances. 

The following Cloud providers are supported:

* AZURE (TODO)
* GCP (TODO)
* AWS (TODO)

The examples are structured based on the chosen cloud provider. Although all providers and examples provide similar functionality, they are matched to a single cloud provider.