class Drag {
    constructor(ele, fn) {
        this.ele = ele;
        this.fn = fn;
        this.init();
    }

    init() {
        let ele = this.ele;
        this.setPC(ele);
        this.setMobile(ele);
    }

    setPC(ele) {
        //pc端 闭包有助于访问mousedown时的变量
        ele.onmousedown = (e) => {
            let disx = e.pageX - ele.offsetLeft;
            let disy = e.pageY - ele.offsetTop;

            document.onmousemove = (e) => {
                e.preventDefault();//解决拖动过快突然事件断掉的怪异bug
                ele.style.left = `${e.pageX - disx}px`;
                ele.style.top = `${e.pageY - disy}px`;
            }

            document.onmouseup = () => {
                if (typeof this.fn === "function") {
                    let obj = {
                        x: ele.style.left.replace(/px/g, "") * 1,
                        y: ele.style.top.replace(/px/g, "") * 1
                    }
                    this.fn(obj);
                }
                document.onmousemove = document.onmouseup = null;//解除事件绑定
            };

        };
    }

    setMobile(ele) {
        //移动端 闭包有助于访问touchstart时的变量
        ele.ontouchstart = (e) => {
            e.preventDefault();//禁止同时触发click事件
            let disx = e.touches[0].clientX - ele.offsetLeft;
            let disy = e.touches[0].clientY - ele.offsetTop;

            let moveFn = (e) => {
                e.preventDefault();//禁止在拖动时移动端窗口滚动问题
                ele.style.left = `${e.touches[0].clientX - disx}px`;
                ele.style.top = `${e.touches[0].clientY - disy}px`;
            }

            document.addEventListener("touchmove", moveFn, { passive: false })//解决chrome56+的报错问题

            document.ontouchend = () => {
                if (typeof this.fn === "function") {
                    let obj = {
                        x: ele.style.left.replace(/px/g, "") * 1,
                        y: ele.style.top.replace(/px/g, "") * 1
                    }
                    this.fn(obj);
                }
                document.ontouchend = null;//解除事件绑定
                document.removeEventListener("touchmove", moveFn);
            };
        };
    }

}

export default Drag;