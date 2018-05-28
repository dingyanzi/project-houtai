import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PreviewimgService } from "../service";
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-previewimg',
  templateUrl: './previewimg.component.html',
  styleUrls: ['./previewimg.component.css']
})
export class PreviewimgComponent implements OnInit {
  @Input() previewImgFile;
  @Input() maxPic;
  @Input() previewImgSrcs;
  @Output() previewImgFileChange: EventEmitter<any> = new EventEmitter();

  showImg:string = "";
  createMessage = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    public previewimgService: PreviewimgService,
    private _message: NzMessageService
  ){ }
  ngOnInit() {

  }
  previewPic(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewimgService.readAsDataUrl(event.target.files[0]).then(function(result) {
      that.previewImgSrcs.push(result);
      let file = event.target.files[0];
      that.previewImgFile.push(file)
      that.previewImgFileChange.emit(that.previewImgFile);
      if(that.previewImgSrcs.length>that.maxPic-1){
        that.createMessage("warning",'您最多上传'+that.maxPic+'张图片');
        return;
      }
    })

  }
  remove(i) {
    this.previewImgSrcs.splice(i,1);
    this.previewImgFile.splice(i,1);
    this.previewImgFileChange.emit(this.previewImgFile);

  }
  isVisible = false;
  isConfirmLoading = false;

  showModal = (url) => {
    this.showImg = url;
    this.isVisible = true;
  }
  handleCancel = (e) => {
    this.isVisible = false;
  }


}
