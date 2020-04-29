---
layout: page
title: Google Cloud Platform
permalink: /google/
---
# Configuration
{: .no_toc }


Google Cloud Platform has a rich and certified collection that provides a good deal of ease and flexibility in getting started with our deployment. 
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

TODO
## Prerequisites 
Before interacting with Google Cloud Platform, you'll need to install some dependencies for the GCP colletion. Specifically the `requests` and `google-auth` packages:
``` pip install requests google-auth```  

You'll also need to configure your credentials. In this tutorial we'll be using the `serviceaccount` type credential, so be sure to checkout the [GCP Getting Started Guide](https://docs.ansible.com/ansible/latest/scenario_guides/guide_gce.html) if you're not familiar with that process.  
## Presentation
For the presentation layer, we'll be creating a set of autoscale VMs to automatically scale up and down based on a health check metric. For the purposes of this tutorial we'll be using CPU load on the systems. We can achieve this with 3 tasks:

```
   - name: Create A Instance Template
      google.cloud.gcp_compute_instance_template:
        name: simple-frontend
        properties:
            machine_type: f1-micro
            disks:
            - auto_delete: 'true'
              boot: 'true'
              device_name: device1
              initialize_params:
                disk_size_gb: "{{ disk_size_gb }}"
                source_image: "{{ gcp_source_image }}"
            network_interfaces:
            - network: "{{ network }}"  
            metadata:
              ssh-keys: "{{admin_user}}:{{ ssh_pub_key }}" 
        auth_kind: "{{ gcp_cred_kind }}"
        project: "{{ gcp_project }}"
        service_account_file: "{{ gcp_cred_file }}"
        state: "{{ desired_state }}"
      register: instancetemplate

    - name: Create an Instance Group Manager
      google.cloud.gcp_compute_instance_group_manager:
        name: "{{gcp_instance_group_name}}"
        base_instance_name: test1-child
        instance_template: "{{ instancetemplate }}"
        target_size: 3
        zone: "{{ gcp_zone }}"
        auth_kind: "{{ gcp_cred_kind }}"
        project: "{{ gcp_project }}"
        service_account_file: "{{ gcp_cred_file }}"
        state: "{{ desired_state }}"
      register: igm
      ignore_errors: true
    
    - name: Get Instance Group Info
      google.cloud.gcp_compute_instance_group_info:
        filters:
          - name = "{{ gcp_instance_group_name }}"
        zone: "{{ gcp_zone }}"
        auth_kind: "{{ gcp_cred_kind }}"
        project: "{{ gcp_project }}"
        service_account_file: "{{ gcp_cred_file }}"
      register: iginfo
      when: desired_state == 'present'
```
## Application
## Database 
Of all the steps in this provisioning process, the database creation takes the longest. Be patient during the creation period of these services to come online.
## Load Balancer