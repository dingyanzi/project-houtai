import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { _ } from "underscore";
import { AllData,PortName,SessionKey } from  '../public/publicData';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import * as moment from "moment";
@Component({
  selector: 'ztint-com',
  templateUrl: "./ztintcom.component.html",
  styleUrls: [ './ztintcom.component.css' ]
})
export class ZtinTcComponent implements OnInit {
  ids:string;
  dataList = {};
  thisImg:string = "";
  isVisible = false;
  downList:Array<any>=[];
  charpter:Array<any>=[];

  id:string = sessionStorage.getItem(SessionKey.ID);

  showModal = (src) => {
    this.thisImg = src;
    this.isVisible = true;
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private router:Router,
    private httpServer:HttpClient,
    private route:ActivatedRoute,
    public _message:NzMessageService

  ){

  }

  toSee(key,url,id,size,limit){
    if(key=="0"){
      this.showModal(url);
    }else if(key=='1'){
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("error","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url = AllData.base_url+PortName.file_preview;
      let data = {
        userId:this.id,
        id:id
      }
      this.httpServer.post(url,data).subscribe(res=> {
        let codes = (res as any).code;
        if(codes == 401){
          this.router.navigate(["login"]);
          return;
        }
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.alertfn("warning","该文件无法在线预览...")
    }

  }
  downLoad(key){
    let id = sessionStorage.getItem(SessionKey.ID);
    window.open( AllData.base_url + "/file/download?ids="+key+"&userId=" + id)
  }
  downAll(){
    let id = sessionStorage.getItem(SessionKey.ID);
    let idsArr = this.downList.map((item)=>{
      return  item.id;
    });
    if(idsArr.length==0){
      this.alertfn("warning","没有可下载的附件...")
      return;
    }

    let ids = JSON.stringify(idsArr);
    ids = ids.substring(1,ids.length-1);
    window.open( AllData.base_url + "/file/download?ids="+ids+"&userId=" + id)

  }
  ngOnInit(){
    this.route.params.subscribe(data => {
      this.ids=data['id'];
    });

    let id = sessionStorage.getItem(SessionKey.ID);
    let url = AllData.base_url+PortName.course_get;
    let data = { userId:id,id:this.ids };
    this.httpServer.post(url,data).subscribe(res=> {
      let codes = (res as any).code;
      if(codes == 401){
        this.router.navigate(["login"]);
        return;
      }
      let data = (res as any).detail;
      this.dataList = data;
      this.charpter = data.chapters;

    })



  }
}





