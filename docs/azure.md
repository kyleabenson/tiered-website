---
layout: page
title: Azure
permalink: /azure/
---
# Azure Deployment
{: .no_toc }


Deploying a traditional 3 tier application to Azure is a common way people get started with cloud providers. This model, often known as *lift and shift* allows you to quickly get started in the cloud using traditional deployment paradigms, without necessarily taking advantage of cloud optimized features.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---
## Prerequisities 

**Install Prerequisites for using Ansible with Azure**
```pip install 'ansible[azure]'```  
```ansible-galaxy collection install azure.azcollection```  
**Login to Azure CLI**  
The easiest way to do this is to follow Microsoft's guide for logging in:
[Login to Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)  
If preferred you can also store credentials in ``` ~/.azure/credentials```  

TODO
## Presentation
For the purposes of this lab we're going to build 3 presentation layer nodes, which will be setup in a round-robin fashion behind the load balancer.

## Application
The business or application layer for this exercise is just a single node, although you could expand and place a load balancer here if needed for scaling constraints

## Database 
The database will be a hosted offering on Azure, which reduces some of the complexity and maintenance of this app

## Load Balancer
The load balancer will also be a hosted offering on Azure, again to reduce the complexities of maintenance but allowing for us to instantiate, modify, and destroy with Ansible in a relatively easy fashion.

## Tips
** Using UI Based Resources for help **
`download template for automation`