import { useEffect, useRef, useState, type JSX } from "react"
import {BrowserMultiFormatReader, type IScannerControls} from '@zxing/browser'
import './ScanISBN.css'

function ScanISBN(): JSX.Element {
    const VideoRef = useRef<HTMLVideoElement>(null)
    const [Result, SetResult] = useState("Waiting for scan...")
    const controlsRef = useRef<IScannerControls | null>(null)

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader()

        //启动摄像头
        codeReader.decodeFromVideoDevice(undefined, VideoRef.current!, (result, _err, controls) => {
            if (result) {
                SetResult(result.getText())
                console.log(result.getText())
                
                controlsRef.current = controls
                controls.stop()
            }
        }).catch(err => {
            console.error('Camera launch failed', err)
            SetResult('Failed to launch camera!')
        })
    }, [])

    return (
      <div className="ScanBody">
        <video ref={VideoRef} style={{ width: '100%', maxWidth: '400px' }} />
        <p>Result: {Result}</p>
      </div>
    );

}
export default ScanISBN