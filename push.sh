#!/bin/bash
git pull
git add ./
echo -n "请输入commit信息 : "   
read  commentstr
git commit -m $commentstr
git push
echo "push成功"
exit 0          
