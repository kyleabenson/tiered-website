---
id: gcp
title: Google Cloud Platform
sidebar_label: Google Cloud Platform
---
Google Cloud Platform has a comprehensive and certified Ansible collection that provides a good deal of ease and flexibility in getting started with our deployment. 

## Prerequisites 

This guide walks through some complex steps and assumes some existing knowledge of using Ansible. That being said I have done my best to make this easy to operate. If you complete the work inside the prerequisite section, you should be able to execute this playbook without issue.

### A note about collections
We'll be using the Google Cloud Collection for this exercise, which means you'll need to be running at least Ansible version 2.9 in order to proceed. To confirm your version, run:  
`ansible --version`  

Then you'll want to install the collection:  
`ansible-galaxy collection install google.cloud`

The syntax for calling a collection looks slightly different. While there are options to make this less apparent I am using the full syntax to highlight that we're using a collection, and you'll notice that calling modules and roles looks slightly different:  
`google.cloud.gcp_compute_instance`  
Where the normal module would look like:  
`gcp_compute_instance`  

Before interacting with Google Cloud Platform, you'll need to install some dependencies for the GCP colletion. Specifically the `requests` and `google-auth` packages:  
``` pip install requests google-auth```  

You'll also need to configure your credentials. In this tutorial we'll be using the `serviceaccount` type credential, so be sure to checkout the [GCP Getting Started Guide](https://docs.ansible.com/ansible/latest/scenario_guides/guide_gce.html) if you're not familiar with that process. 

Before proceeding, you should have a project created, as well as a serviceaccount with it's corresponding credential file. 

Make sure to populate the file `config.yml` with the appropriate contents for GCP. Note that the first several values will be dependent on your project name, credential file, and regional specifications. The ones below as listed solely as an example:
```
gcp_project: kbenson-workspace
gcp_cred_kind: serviceaccount
gcp_cred_file: kbenson-workspace.json
gcp_region: us-east1
gcp_zone: "{{ gcp_region }}-b"
gcp_instance_group_name: simple-frontend
gcp_lb_name_prefix: frontend
gcp_source_image: "projects/rhel-cloud/global/images/rhel-8-v20200413"
```

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
The application layer in this example is a single host. 
```
    - name: Create Business Layer Host
      google.cloud.gcp_compute_instance:
        name: bizlayer
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
        zone: "{{ gcp_zone }}"
        auth_kind: "{{ gcp_cred_kind }}"
        project: "{{ gcp_project }}"
        service_account_file: "{{ gcp_cred_file }}"
        state: "{{ desired_state }}"
```

In some environments it would likely be desireable to have a load balancer and autoscale set here to keep the business layer from becoming a bottleneck. If that's the case you can consider creating one similarly to how we did for the frontend systems.


## Load Balancer
As part of the certified collection from Google for Google Cloud Platform, they have provided a really nice role to configure a loadbalancer, making this a super easy setup:
```
    - name: Create a Load Balancer
      import_role:
        name: google.cloud.gcp_http_lb
```

## Database 
Of all the steps in this provisioning process, the database creation takes the longest. Be patient during the creation period of these services to come online.


Once everything is complete, we're ready to populate our database, setup the business logic server, and configure our frontend apps. 


# Config
TODO