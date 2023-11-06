import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Filesystem, Directory, ReaddirResult } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';
import { VoiceRecorder, RecordingData } from 'capacitor-voice-recorder';
  
@Component({
  selector: 'app-recording-list',
  templateUrl: './recording-list.page.html',
  styleUrls: ['./recording-list.page.scss'],
})
export class RecordingListPage implements OnInit, AfterViewInit {

  recording= false;
  storedFileNames= [];
  durationDisplay= '';
  duration= 0;
  @ViewChild('recordbtn', {read: ElementRef}) recordbtn: ElementRef;

  constructor(private gestureCtrl: GestureController) { }

  ngOnInit() {
    this.loadFiles();
  }

  ngAfterViewInit() {
    const longpress= this.gestureCtrl.create({
      el: this.recordbtn.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: ev => {
        Haptics.impact({style: ImpactStyle.Light});
        this.startRecording();
        this.calculateDuration();
      },
      onEnd: ev => {
        Haptics.impact({style: ImpactStyle.Light});
        this.stopRecording();
      }
    }, true);

    longpress.enable();
  }

  calculateDuration()
  {
    if(!this.recording)
    {
      this.duration= 0;
      this.durationDisplay= '';
      return;
    }

    this.duration +=1;
    const minutes= Math.floor(this.duration/60);
    const seconds= (this.duration%60).toString().padStart(2, '0');
    this.durationDisplay= `${minutes}:${seconds}`;
    setTimeout(()=> {
      this.calculateDuration();
    }, 1000);
  }

  async loadFiles()
  {
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result => {
      //const files= (result as ReaddirResult).files;
      console.log(`This is the data for recorgings: ${result}`);
      this.storedFileNames= result.files; //tsconfig.json > CompilerOptions > strict=false
    });
  }

  startRecording()
  {
    if(this.recording)
    {
      return;
    }
    this.recording= true;
    VoiceRecorder.startRecording();
  }

  stopRecording()
  {
    if(!this.recording)
    {
      return;
    }
    this.recording= false;
    VoiceRecorder.stopRecording().then(async (result: RecordingData) =>{
      this.recording= false;
      if(result.value && result.value.recordDataBase64)
      {
        const recordData= result.value.recordDataBase64;
        console.log(`This is the recordData after the recording stopped: ${recordData}`);
        const fileName= new Date().getTime() + '.wav';
        await Filesystem.writeFile({
          path: fileName,
          directory: Directory.Data,
          data: recordData
        });
        this.loadFiles();
      }
    });
  }

  async playFile(fileName)
  {
    const audioFile= await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    });
    console.log(`This is the playAudio: ${audioFile}`);

    const base64Sound= audioFile.data;
    const audioRef= new Audio(`data:audio/aac;base64, ${base64Sound}`);
    audioRef.oncanplaythrough = ()=> {audioRef.play(); };
    audioRef.load();
  }

  async deleteRecording(fileName)
  {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: fileName
    });
    this.loadFiles();
  }
}
