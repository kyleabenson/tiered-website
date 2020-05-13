(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{136:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var o=n(2),a=n(9),r=(n(0),n(159)),i={id:"gcp",title:"Google Cloud Platform",sidebar_label:"Google Cloud Platform"},c={id:"gcp",title:"Google Cloud Platform",description:"Google Cloud Platform has a comprehensive and certified Ansible collection that provides a good deal of ease and flexibility in getting started with our deployment. ",source:"@site/docs/gcp.md",permalink:"/tiered-website/docs/gcp",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/gcp.md",sidebar_label:"Google Cloud Platform",sidebar:"someSidebar",previous:{title:"Azure",permalink:"/tiered-website/docs/azure"}},l=[{value:"Prerequisites",id:"prerequisites",children:[{value:"A note about collections",id:"a-note-about-collections",children:[]}]},{value:"Presentation",id:"presentation",children:[]},{value:"Application",id:"application",children:[]},{value:"Load Balancer",id:"load-balancer",children:[]},{value:"Database",id:"database",children:[]}],s={rightToc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Google Cloud Platform has a comprehensive and certified Ansible collection that provides a good deal of ease and flexibility in getting started with our deployment. "),Object(r.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(r.b)("p",null,"This guide walks through some complex steps and assumes some existing knowledge of using Ansible. That being said I have done my best to make this easy to operate. If you complete the work inside the prerequisite section, you should be able to execute this playbook without issue."),Object(r.b)("h3",{id:"a-note-about-collections"},"A note about collections"),Object(r.b)("p",null,"We'll be using the Google Cloud Collection for this exercise, which means you'll need to be running at least Ansible version 2.9 in order to proceed. To confirm your version, run:",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("inlineCode",{parentName:"p"},"ansible --version"),"  "),Object(r.b)("p",null,"Then you'll want to install the collection:",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("inlineCode",{parentName:"p"},"ansible-galaxy collection install google.cloud")),Object(r.b)("p",null,"The syntax for calling a collection looks slightly different. While there are options to make this less apparent I am using the full syntax to highlight that we're using a collection, and you'll notice that calling modules and roles looks slightly different:",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("inlineCode",{parentName:"p"},"google.cloud.gcp_compute_instance"),Object(r.b)("br",{parentName:"p"}),"\n","Where the normal module would look like:",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("inlineCode",{parentName:"p"},"gcp_compute_instance"),"  "),Object(r.b)("p",null,"Before interacting with Google Cloud Platform, you'll need to install some dependencies for the GCP colletion. Specifically the ",Object(r.b)("inlineCode",{parentName:"p"},"requests")," and ",Object(r.b)("inlineCode",{parentName:"p"},"google-auth")," packages:",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("inlineCode",{parentName:"p"},"pip install requests google-auth"),"  "),Object(r.b)("p",null,"You'll also need to configure your credentials. In this tutorial we'll be using the ",Object(r.b)("inlineCode",{parentName:"p"},"serviceaccount")," type credential, so be sure to checkout the ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://docs.ansible.com/ansible/latest/scenario_guides/guide_gce.html"}),"GCP Getting Started Guide")," if you're not familiar with that process. "),Object(r.b)("p",null,"Before proceeding, you should have a project created, as well as a serviceaccount with it's corresponding credential file. "),Object(r.b)("p",null,"Make sure to populate the file ",Object(r.b)("inlineCode",{parentName:"p"},"config.yml")," with the appropriate contents for GCP. Note that the first several values will be dependent on your project name, credential file, and regional specifications. The ones below as listed solely as an example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{}),'gcp_project: kbenson-workspace\ngcp_cred_kind: serviceaccount\ngcp_cred_file: kbenson-workspace.json\ngcp_region: us-east1\ngcp_zone: "{{ gcp_region }}-b"\ngcp_instance_group_name: simple-frontend\ngcp_lb_name_prefix: frontend\ngcp_source_image: "projects/rhel-cloud/global/images/rhel-8-v20200413"\n')),Object(r.b)("h2",{id:"presentation"},"Presentation"),Object(r.b)("p",null,"For the presentation layer, we'll be creating a set of autoscale VMs to automatically scale up and down based on a health check metric. For the purposes of this tutorial we'll be using CPU load on the systems. We can achieve this with 3 tasks:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{}),'   - name: Create A Instance Template\n      google.cloud.gcp_compute_instance_template:\n        name: simple-frontend\n        properties:\n            machine_type: f1-micro\n            disks:\n            - auto_delete: \'true\'\n              boot: \'true\'\n              device_name: device1\n              initialize_params:\n                disk_size_gb: "{{ disk_size_gb }}"\n                source_image: "{{ gcp_source_image }}"\n            network_interfaces:\n            - network: "{{ network }}"  \n            metadata:\n              ssh-keys: "{{admin_user}}:{{ ssh_pub_key }}" \n        auth_kind: "{{ gcp_cred_kind }}"\n        project: "{{ gcp_project }}"\n        service_account_file: "{{ gcp_cred_file }}"\n        state: "{{ desired_state }}"\n      register: instancetemplate\n\n    - name: Create an Instance Group Manager\n      google.cloud.gcp_compute_instance_group_manager:\n        name: "{{gcp_instance_group_name}}"\n        base_instance_name: test1-child\n        instance_template: "{{ instancetemplate }}"\n        target_size: 3\n        zone: "{{ gcp_zone }}"\n        auth_kind: "{{ gcp_cred_kind }}"\n        project: "{{ gcp_project }}"\n        service_account_file: "{{ gcp_cred_file }}"\n        state: "{{ desired_state }}"\n      register: igm\n      ignore_errors: true\n    \n    - name: Get Instance Group Info\n      google.cloud.gcp_compute_instance_group_info:\n        filters:\n          - name = "{{ gcp_instance_group_name }}"\n        zone: "{{ gcp_zone }}"\n        auth_kind: "{{ gcp_cred_kind }}"\n        project: "{{ gcp_project }}"\n        service_account_file: "{{ gcp_cred_file }}"\n      register: iginfo\n      when: desired_state == \'present\'\n')),Object(r.b)("h2",{id:"application"},"Application"),Object(r.b)("p",null,"The application layer in this example is a single host. "),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{}),'    - name: Create Business Layer Host\n      google.cloud.gcp_compute_instance:\n        name: bizlayer\n        machine_type: f1-micro\n        disks:\n        - auto_delete: \'true\'\n          boot: \'true\'\n          device_name: device1\n          initialize_params:\n            disk_size_gb: "{{ disk_size_gb }}"\n            source_image: "{{ gcp_source_image }}"\n        network_interfaces:\n        - network: "{{ network }}"\n        metadata:\n          ssh-keys: "{{admin_user}}:{{ ssh_pub_key }}" \n        zone: "{{ gcp_zone }}"\n        auth_kind: "{{ gcp_cred_kind }}"\n        project: "{{ gcp_project }}"\n        service_account_file: "{{ gcp_cred_file }}"\n        state: "{{ desired_state }}"\n')),Object(r.b)("p",null,"In some environments it would likely be desireable to have a load balancer and autoscale set here to keep the business layer from becoming a bottleneck. If that's the case you can consider creating one similarly to how we did for the frontend systems."),Object(r.b)("h2",{id:"load-balancer"},"Load Balancer"),Object(r.b)("p",null,"As part of the certified collection from Google for Google Cloud Platform, they have provided a really nice role to configure a loadbalancer, making this a super easy setup:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{}),"    - name: Create a Load Balancer\n      import_role:\n        name: google.cloud.gcp_http_lb\n")),Object(r.b)("h2",{id:"database"},"Database"),Object(r.b)("p",null,"Of all the steps in this provisioning process, the database creation takes the longest. Be patient during the creation period of these services to come online."),Object(r.b)("p",null,"Once everything is complete, we're ready to populate our database, setup the business logic server, and configure our frontend apps. "),Object(r.b)("h1",{id:"config"},"Config"),Object(r.b)("p",null,"TODO"))}p.isMDXComponent=!0},159:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return g}));var o=n(0),a=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},u=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),b=o,g=u["".concat(i,".").concat(b)]||u[b]||d[b]||r;return n?a.a.createElement(g,c({ref:t},s,{components:n})):a.a.createElement(g,c({ref:t},s))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<r;s++)i[s]=n[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);