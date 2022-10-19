#!/bin/bash

cd draco/build_dir
counter=1051
#1351
while [ $counter -le 1351 ]
do
./draco_encoder -point_cloud -i ../../Ply/longdress_vox10_$counter.ply -o ../../out/$counter.drc
./draco_decoder  -i ../../out/$counter.drc -o ../../decoded/$counter.ply
((counter++))
done

echo All 300 done!
