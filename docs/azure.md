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
## Application
## Database 
## Load Balancer

## Tips
** Using UI Based Resources for help **
`download template for automation`