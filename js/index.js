function scan() {
        let scanner = new Instascan.Scanner({ video: document.getElementById('index-video') });
        Instascan.Camera.getCameras().then(cameras => {
        scanner.camera = cameras[cameras.length - 1];
        scanner.start();
    }).catch(e => console.error(e));  
        scanner.addListener('scan', content => {
        window.location.href = "termo.html?nome=wesley"    
    });
}