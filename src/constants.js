import question1 from './img/question1.PNG'
import question2 from './img/question2.png'
export const dataFake = [
    {
        id: 0,
        type: 'iframe',
        label: 'Mô phỏng mở đầu',
        title: 'Dòng điện chạy qua đèn',
        src: "http://www.physics-chemistry-interactive-flash-animation.com/electricity_electromagnetism_interactive/simple_circuit.htm?fbclid=IwAR0WF02Ervcpl_fPQYvtqnRc-HGyJzgACD1onu3ohpmeEkTDeVOu0HJrwY4",
        required: false

    },
    {
        id: 1,
        type: 'video',
        label: 'Video thí nghiệm',
        title: 'Thí nghiệm đo cường độ dòng điện',
        src: <iframe width="688" height="387" src="https://www.youtube.com/embed/ouuCzKPsfbI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        required: false
    },
    {
        id: 2,
        type: 'iframe',
        title: 'Bài giảng',
        src: "https://docs.google.com/presentation/d/e/2PACX-1vTr5T9vSxZCyLsmqIGLLqIZ2uCSoyynowUhumf-1ojLiD6eCVUbtta9pmy8VdmdvA/embed?start=false&loop=false&delayms=3000",
        required: false
    },
    {
        id: 3,
        label: 'Mô phỏng',
        title: 'Mô phỏng mắc mạch điện',
        type: 'iframe',
        src: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_en.html?fbclid=IwAR0hRCMEUrKkQYsNG8KLgikTEiWisNlIddK791rJsAJLVCqGf9BrFTldsOY",
        required: false,
    },
    {
        id: 4,
        type: 'blank',
        label: 'Bài tập 1',
        title: 'Điền cực của Ampere vào chỗ trống',
        src: question1,
        answers: ['-', '+', "-", "+"],
        position: [{ top: -14, right: 645 }, { top: -14, right: 530 }, { top: -14, right: 280 }, { top: -14, right: 160 }],
        required: false,
    },
    {
        id: 5,
        type: 'radio',
        label: 'Bài tập 2',
        title: 'Đơn vị đo cường độ dòng điện là gì?',
        questions: [
            { id: 1, title: 'Newton (N)' },
            { id: 2, title: 'Hertz (Hz)' },
            { id: 3, title: 'Decibel (dB)' },
            { id: 4, title: 'Ampere (A)' },
        ],
        answers: [4],
        required: false
    },
    {
        id: 6,
        type: 'radio',
        label: 'Bài tập 3',
        title: 'Ampere kế có giới hạn đo là 50 mA phù hợp để đo cường độ dòng điện nào dưới đây?',
        questions: [
            { id: 1, title: 'Dòng điện đi qua bóng đèn pin có cường độ 0,35 A' },
            { id: 2, title: 'Dòng điện đi qua đèn diode phát quang có cường độ là 28 mA' },
            { id: 3, title: 'Dòng điện đi qua nam châm điện có cường độ là 0,8 A' },
            { id: 4, title: 'Dòng điện đi qua bóng đèn xe máy có cường độ là 0,50 A' },
        ],
        answers: [2],
        required: false
    },
    {
        id: 7,
        type: 'space',
        label: 'Bài tập 4',
        title: 'Điền vào chỗ trống',
        questions: [
            'Ampere kế này có giới hạn đo là', { index: 0 }, 'mA./n', 'Ampere kế này có độ chia nhỏ nhất là .', { index: 1 }, 'mA.'
        ],
        src: question2,
        answers: ['5000', "1"],
        required: false
    },

]