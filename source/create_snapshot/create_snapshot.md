# Create Snapshot

###  Generate data from clients
We will SSH to the clients and create a sample data set.  This data set will then be restored to a new cluster.



### Mount Azure Client
This is only required if you are manually mounting and the Terraform scrpit did not mount

```bash
sudo mkdir /mnt/weka
```
```bash
sudo mount -t wekafs -o net=enP34050s2np0/10.0.1.4/24/10.0.1.1 -o num_cores=1 -o mgmt_ip=10.0.1.7 74.235.237.199/default /mnt/weka
weka
```

```bash
chmod 777 /mnt/weka
```
```bash
cd /mnt/weka
```

### Create Test Data
We will create a small sample of test data using **dd**

```bash
for i in $(seq -w 1 10); do dd if=/dev/zero of="$(hostname)_file_part${i}.img" bs=50M count=10 status=progress; done
```

### Take md5sum 

We will do an md5sum on the test data to compare after snapshot restore.  Copy the output to a text file for refrence.

```bash
md5sum *
```

```{image} ./images/md5sum.png
:class: bordered
:alt: md5sum
```

### Create and upload Snapshot

```bash
weka fs snapshot create default aspen
```
```{image} ./images/create_snap.png
:class: bordered
:alt: Create Snap
```


U
```bash
weka fs snapshot upload default aspen
```

```{image} ./images/upload_snap.png
:class: bordered
:alt: Upload Snap
```

Take note of your snapshot locator.  We will need this for the restore.

```bash
weka fs snapshot
````
