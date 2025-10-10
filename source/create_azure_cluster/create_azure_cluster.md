# Create WEKA Azure Cluster

###  Overview
Creating the clusters will be done with [WEKA CDM](https://cloud.weka.io). This will generate a Terraform file that is used to create the WEKA cluster.  

**Prerequisites**

- Admin Access in Azure
    - Resource Group created in Azure.  If using the WEKA lab use **East-US**
- WEKA CDM access
- Experience with Terraform

### CDM Config

1.  In [WEKA CDM](https://cloud.weka.io) choose **Azure**

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

3.  On the Network Configuration page 
    - Change "Create Vnet and Subnet" to **Yes**
    - Change "Assign Public IP" to **Yes**

```{note}
We are assigning a public IP in the lab so we can connect remotely.
```

```{image} ./images/cdm_network.png
:width: 50%
:class: zoomable
:alt: CDM Network
```

4.  On the Security Configuration page change 
    - Change "Create Network Security Group" to **Yes**
    - On "Allowable CIDR for TCP Port 22 Access" add **0.0.0.0/0**
    - On "Allowable CIDR for TCP Port 14000 Access" add **0.0.0.0/0**

```{note}
We are using 0.0.0.0/0 in the lab so we can connect remotely. In a production deployment these should be set to valid ranges.
```

```{image} ./images/cdm_security.png
:width: 50%
:class: zoomable
:alt: CDM Security
```

5.  On the Clients page change 
    - Change "Deploy WEKA stateless clients" to **yes**
    - Set "Number of Clients to **3**.
    - Change :Machine Type of Clients" to **Standard_D4s_v3**


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
:class: bordered
:alt: Terraform Output
```


8.  Once Terrform completes you will need to logon to the **Azure Portal** and add an inbound **14000** rule to your SG.

```{image} ./images/azure_inbound.png
:width: 50%
:class: zoomable
:alt: Azure SG
```

9.  Retrive your WEKA admin password from the Azure Key Vault.  Navigate to the newly created Key Vault >> Objects >> Secrets > weka password >> current version >> show secret value

```{image} ./images/weka_secret.png
:width: 50%
:class: zoomable
:alt: WEKA Secret
```
