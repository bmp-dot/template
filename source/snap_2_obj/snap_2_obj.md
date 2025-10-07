# Create Azure Cluster

## Overview
In this lab we will create a cluster in Azure and AWS, setup Snap 2 Object, then restore the file system to different cluster.

##  Creating WEKA cloud cluster
Creating the clusters will be done with WEKA CDM https://cloud.weka.io

To create a key pair search "key pairs" in the AWS 

1.  In WEKA CDM choose your cloud


    ```{image} ./images/cdm.png
    :width: 50%
    :class: zoomable
    :alt: CDM
    ```

2.  Fill out the required fields on the Basic page that don't have defaults
    - Cluster Name
    - Subscription ID
    - Deployment Resource Group Nam
    - Vnet Resource Group Name


    ```{image} ./images/cdm_basic.png
    :width: 50%
    :class: zoomable
    :alt: CDM Basic
    ```

3.  On the Network Configuration page change "Create Vnet and Subnet" to **yes**


    ```{image} ./images/cdm_network.png
    :width: 50%
    :class: zoomable
    :alt: CDM Network
    ```

4.  On the Security Configuration page change Create Network Security Group to **yes** 


    ```{image} ./images/cdm_security.png
    :width: 50%
    :class: zoomable
    :alt: CDM Security
    ```

5.  On the Clients  page change "Number of Clients to **3**.  These clients will be used to generate test data that will be restored witn Snap2Obj.


    ```{image} ./images/cdm_clients.png
    :width: 50%
    :class: zoomable
    :alt: CDM Clients
    ```

6.  On the right hand side download the generated Terraform file


    ```{image} ./images/tf_download.png
    :width: 50%
    :class: zoomable
    :alt: Terraform
    ```

7.  Run **terrafrom init** and **terraform apply**.  You should get an output simialr to the below.


   ```{image} ./images/tf_output.png
    :width: 50%
    :class: zoomable
    :alt: Terraform Output
    ```


8.  Once that finishes you will need to logon to the **Azure Portal** and go to the WEKA 


##  New section