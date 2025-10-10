# Connect Existing Object 

### Restore Snapshot
From our AWS cluster we will now connect the Azure blob created in the pervious module.  This will allow us to run `fs download` to restore / migrate the file system to another WEKA cluster in a completley different cloud provider. The filesystem is created immediately. Metadata is fetched first by a background prefetcher so the tree becomes browsable immdiatley. File data is then downloaded on-demand when accessed, or proactively if you choose to prefetch. You do not need to wait for a full “bulk data restore.”  In short end users cam immdiatley access their data.

### WEKA Setup
1. Add the existing remote bucket to your WEKA cluster. You will need the following vaules from the previous moudle.

    - STORAGE_ACCOUNT_NAME
    - CONTAINER_NAME
    - STORAGE_ACCOUNT_ACCESS_KEY

```bash
weka fs tier s3 add azure-obs --site local --obs-name default-local --obs-type AZURE --hostname $STORAGE_ACCOUNT_NAME.blob.core.windows.net --port 443 --bucket $CONTAINER_NAME --access-key-id $STORAGE_ACCOUNT_NAME --secret-key $STORAGE_ACCOUNT_ACCESS_KEY --protocol https --auth-method AWSSignature4
```

2. Attatch the buckt to your **default** file system 

```bash
weka fs tier s3 attach default azure-obs --mode remote