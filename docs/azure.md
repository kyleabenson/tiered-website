---
id: azure
title: Azure
sidebar_label: Azure
---

# Azure Deployment



Deploying a traditional 3 tier application to Azure is a common way people get started with cloud providers. This model, often known as *lift and shift* allows you to quickly get started in the cloud using traditional deployment paradigms, without necessarily taking advantage of cloud optimized features.

At the end of this exercise, we'll have installed a [TO DO simple web app](#) across this environment.

---
## Prerequisities 

**Install Prerequisites for using Ansible with Azure**
```pip install 'ansible[azure]'```  
```ansible-galaxy collection install azure.azcollection```  
**Login to Azure CLI**  
The easiest way to do this is to follow Microsoft's guide for logging in:
[Login to Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)  
If preferred you can also store credentials in ``` ~/.azure/credentials```  

## Notes
All configuration options are stored in the `config.yml` file at the top level of this project, which will allow you configure usernamers, resource groups, etc.   

## Presentation Layer
For the purposes of this lab we're going to build 3 presentation layer nodes, which will be setup in a round-robin fashion behind the load balancer. We could also setup monitoring capabilties to scale up VM count based on certain performance or load metrics, but we'll set that aside for now.

### Provisioning the 3 VMs
The easiest way to do this, rather than creating individual VMs, is to use the `azure_rm_virtualmachinescaleset` module which will automatically create the defined amount of VMs from the same standards. Since we're creating 3 to start, it will look like this:
```
    - name: Create Presentation Layer virtual machine scaling set
      azure_rm_virtualmachinescaleset:
            resource_group: "{{ azure_resource_group }}"
            name: testvmss
            vm_size: Standard_DS1_v2
            capacity: 3
            virtual_network_name: "{{ azure_network_name }}"
            upgrade_policy: Manual
            load_balancer: test_lb
            subnet_name: default
            admin_username: "{{ admin_user }}"
            ssh_password_enabled: false
            ssh_public_keys:
            - path: "/home/{{ admin_user }}/.ssh/authorized_keys"
              key_data: 
            managed_disk_type: Standard_LRS
            image:
                offer: RHEL
                publisher: RedHat
                sku: 8.1
                version: latest
            data_disks:
            - lun: 0
              disk_size_gb: 64
              caching: ReadWrite
              managed_disk_type: Standard_LRS
```

## Application
The business or application layer for this exercise is just a single node, although you could expand and place a load balancer here if needed for scaling constraints

### Provisioning the application layer
Since we only need a single system for our business logic in this example, we'll create a single VM that we'll install our middleware onto. 

## Database 
The database will be a hosted offering on Azure, which reduces some of the complexity and maintenance of this app

## Load Balancer
The load balancer will also be a hosted offering on Azure, again to reduce the complexities of maintenance but allowing for us to instantiate, modify, and destroy with Ansible in a relatively easy fashion.

## Tips
**Using UI Based Resources for help**  
`download template for automation`

**Jump Host Configuration**  
Rather than expose the public IPs of all the servers for SSH, we can create a jump or bastion host and have Ansible connect through a single host, reducing the surface area of future attackss
TODO