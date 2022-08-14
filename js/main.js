// 함수 바로 호출
(() => {
    // 전역 변수 사용을 피하기 위해 함수 안에서 진행

    // 각 씬 정보를 담고있는 배열, 객체 4개 생성(스크롤 섹션 4개라서)
    // 1. 스크롤 높이 정보
    // scrollHeight: 0 으로 하는 이유, 각 디바이스마다 다르기 때문에 높이를 고정값으로 받지 않음, 스크린의 높이에 대한 배수로 할 것임
    // 각 디바이스의 높이를 읽고 x 5배(HeightNum)
    // 애니메이션 효과 있는 부분은 sticky 보통 스크롤인 것은 normal로 type 적용
    // 2. 몇번째 섹션이 스크롤 중인지 판별

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 눈 앞에 보고 있는 씬


    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            HeightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                // 애니메이션에 조작할 오브젝트들 가져옴
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            // 투명도 변화와 y값 변화
            values: {
                messageA_opacity: [0, 1]
            }
        },
        {
            // 1
            type: 'normal', 
            HeightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            HeightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            HeightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i=0;i<sceneInfo.length;i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].HeightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //${변수 사용가능} 
        }
        // console.log(sceneInfo); 

        yOffset = window.pageYOffset;
        // 새로고침 대처용
        let totalScrollHeight = 0;
        for (let i=0;i<sceneInfo.length;i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function playAnimation() {
        switch (currentScene) {
            case 0:
                // console.log('0 play');
                break;
            case 1:
                // console.log('1 play');
                break;
            case 2:
                // console.log('2 play');
                break;
            case 3:
                // console.log('3 play');
                break;
        }
    }
    

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i=0;i<currentScene;i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        // console.log(prevScrollHeight);
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight ) {
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        // console.log(yOffset);
        // console.log(currentScene);
        playAnimation();
    }

    window.addEventListener('scroll',() => {
        yOffset = window.pageYOffset; // 편하게 쓰기 위해 변수 선언
        scrollLoop();
    });
    window.addEventListener('load',setLayout); 
    // load는 웹페이지 이미지, 리소스 등 다 업로드 된 후에 실행됨
    // DOMContentLoaded : html의 DOM 구조만 로드가 끝나면 바로 실행됨
    // 그래서 load 보다 DOMContentLoaded가 빠름
    // 하지만 지금 만드는 웹사이트는 이미지, 리소스가 있어야 의미있으므로 load 사용함
    window.addEventListener('resize',setLayout);
    
})();
// => 위랑 같음 (function() {})();