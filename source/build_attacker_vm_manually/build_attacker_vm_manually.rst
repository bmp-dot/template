.. _build_attacker_vm_manually:

=============================
Build Attacker VM (Manually)
=============================

Requirements
============

-  Python3.6+ is required.
-  Terraform >= 0.14 installed and in your $PATH.
-  The AWS CLI installed and in your $PATH, and an AWS account with sufficient privileges to create and destroy resources.
   -  AWS `Named profile configured <https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html>`

Notes
=====
- Fresh Ubuntu install in VMware Parallels on x86 OSX
  - To contribute to other OS or hardware profiles please provide a "how to" in RST or MD 
  - For terraform on ARM please see https://www.terraform.io/downloads
- SE DfAWS Console https://207753870716.uw2.portal.vectra.ai/
- AWS target account vectra-demolab (884414556547)

Build attacker machine
======================

Install common packages
+++++++++++++++++++++++

.. code:: console

    sudo apt-get update && sudo apt install -y ssh vim net-tools curl git python3-pip unzip


Install awscli
++++++++++++++

-  Download the package

.. code:: console

    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

-  Unzip the installer

.. code:: console

    unzip awscliv2.zip

-  Run the install program

.. code:: console

    sudo ./aws/install

Install terraform
+++++++++++++++++

-  Terraform Prerequisites

.. code:: console

    sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

-  Add the HashiCorp GPG key

.. code:: console

    curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -

-  Add the official HashiCorp Linux repository

.. code:: console

    sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"

-  Update to add the repository, and install the Terraform CLI
  
.. code:: console

    sudo apt-get update && sudo apt-get install terraform

Install Cloudgoat
+++++++++++++++++
-  Use git to clone the Cloudgoat repo to home directory and change to
   the new directory

.. code:: console     
   
    git clone https://github.com/RhinoSecurityLabs/cloudgoat.git ~/cloudgoat && cd ~/cloudgoat
   
-  Install the Cloudgoat dependencies

.. code:: console

    pip3 install -r requirements.txt && chmod u+x cloudgoat.py

Install Pacu
++++++++++++

-  Use git to clone the Pacu repo to home directory and change to the
   new directory

.. code:: console

    git clone https://github.com/VectraCommunity/pacu.git ~/pacu && cd ~/pacu

-  Install the Pacu dependencies
 
.. code:: console      
   
    pip3 install -r requirements.txt

Setup AWS Profile
+++++++++++++++++

-  Setup AWS profile for Cloudgoat. This account will need admin access
   in AWS. This will create or add a new profile in ``~/.aws/config``
   and ``~/.aws/credentials``

-  You will be prompted for
   ``Access Key ID, AWS Secret Access Key, Default region name, Default output format``

.. code:: console

    aws configure --profile cloudgoat

-  Make the new aws profile your default

.. code:: console

    export AWS_PROFILE=cloudgoat

-  Verify credentials are working

.. code:: console

    aws sts get-caller-identity

.. figure:: ./images/awsprofile.png
    :alt: awsprofile

Setup Cloudgoat
+++++++++++++++

- Run Cloudgoat config profile from home directory and set default
  profile. You will be prompted to enter an AWS profile from the
  previous step which we called ``cloudgoat``. This is how Cloudgoat
  will access AWS. 
      
.. code:: console
      
    ~/cloudgoat/cloudgoat.py config profile

- Run Cloudgoat config whitlelist
   
.. code:: console

    ~/cloudgoat/cloudgoat.py config whitelist --auto