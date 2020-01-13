class CameraPanel extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('ha-card');
        div.className = 'camera-panel'
        div.innerHTML = `
			<div class="card-header"><div class="name">摄像监控</div></div>
            <video></video>
            <footer>
				<div class="op" data-op="left">
					<ha-icon icon="mdi:menu-left-outline"></ha-icon>
					<br/>
					左移
				</div>
				<div class="op" data-op="right">
					<ha-icon icon="mdi:menu-right-outline"></ha-icon>
					<br/>
					右移
				</div>
				<div class="op" data-op="up">
					<ha-icon icon="mdi:menu-up-outline"></ha-icon>
					<br/>
					上移
				</div>
				<div class="op" data-op="down">
					<ha-icon icon="mdi:menu-down-outline"></ha-icon>
					<br/>
					下移
				</div>
				<div class="op" data-op="minus">
					<ha-icon icon="mdi:video-minus"></ha-icon>
					<br/>
					缩小
				</div>
				<div class="op" data-op="plus">
					<ha-icon icon="mdi:video-plus"></ha-icon>
					<br/>
					放大
				</div>
            </footer>
            <style>
              video{width:100%;}
              footer{padding:15px;display:flex;text-align:center;}
			  footer div{width:100%;cursor:pointer;}
			  footer ha-icon{width:40px;}
            </style>
        `
        shadow.appendChild(div)
        this.shadow = shadow
        // console.log('%O', this)
		shadow.querySelectorAll('.op').forEach(ele=>ele.onclick = (event)=>{
			let op = ele.dataset.op
			if(op in this.config){
				let obj = this.config[op]
				console.log(obj)
				this.call(obj)
			}
		})
    }
	
	call({domain, service, data}){
		this._hass.callService(domain, service, data)
	}
	
    set hass(hass) {
        this._hass = hass
    }
	
    setConfig(config) {
        if (!config.url) {
            throw new Error('你需要定义一个视频播放链接【url】');
        }
        this.config = config;
		const $ = this.shadow.querySelector.bind(this.shadow)
		$('.card-header .name').textContent = config.title || '摄像监控'		
		this.loadScript(`https://cdn.bootcss.com/hls.js/8.0.0-beta.3/hls.min.js`).then(()=>{
			const video = $('video');
			if(Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(config.url);
				hls.attachMedia(video);
				hls.on(Hls.Events.MANIFEST_PARSED,function() {
				  video.play();
			  });
			}else{
				video.src = config.url;
				video.addEventListener('loadedmetadata',function() {
				  video.play();
				});
			}
			
		})

    }

    getCardSize() {
        return 2;
    }

	loadScript(src) {
        return new Promise((resolve, reject) => {
            let id = btoa(src)
            let ele = document.getElementById(id)
            if (ele) {
                resolve()
                return
            }
            let script = document.createElement('script')
            script.id = id
            script.src = src
            script.onload = function () {
                resolve()
            }
            document.querySelector('head').appendChild(script)
        })
    }
}

customElements.define('camera-panel', CameraPanel);