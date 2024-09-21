function createModal() {
  const modal = document.createElement('div');
  modal.id = 'downloadProgressModal';
  modal.style.display = 'block';
  modal.style.position = 'fixed';
  modal.style.zIndex = '1';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fefefe';
  modalContent.style.position = 'relative';
  modalContent.style.margin = '15% auto 0';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #888';
  modalContent.style.width = '50%';
  modalContent.style.textAlign = 'center';

  modal.appendChild(modalContent);

  return {modal, modalContent};
}

function formatDate(date) {
  const dateUnit = ['초','분','시','일'];
  const days = Math.floor(date / (1000 * 60 * 60 * 24)); // 남은 일수
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 남은 시수
  const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60)); // 남은 분수
  const seconds = Math.floor((date % (1000 * 60)) / 1000); // 남은 초

  return [
    days, hours, minutes, seconds
  ].filter(Boolean).reverse().map((v,i) => `${v}${dateUnit[i]}`).reverse().join(' ')
}

async function reservation() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const {modal, modalContent} = createModal();

  const _targetDate = prompt('예약할 날짜를 입력해주세요. ex) 2024-09-21');
  const now = new Date();
  const targetDate = new Date(_targetDate);
  targetDate.setDate(targetDate.getDate() - 21);

  if (targetDate <= now) {
    alert('타겟 날짜는 과거입니다. 미래 날짜를 입력하세요.');
    return
  }
  document.body.appendChild(modal);

  const timeToTarget = targetDate.getTime() - now.getTime();
  const progressLabel = document.createElement('div');
  progressLabel.style.marginTop = '5px';
  modalContent.appendChild(progressLabel);

  const remainingTime = targetDate - new Date();
  progressLabel.textContent = `${formatDate(remainingTime)} 후에 예약을 시도합니다.`;

  return delay(timeToTarget)
    .then(async () => {
      const formData = new URLSearchParams();
      formData.append('date', dayjs(targetDate).format('YYYY-MM-DD'));

      const response = await fetch('https://najuhills.com/get_reservation_tee_time/', {
        method: 'POST',
        body: formData,
        credentials: 'include', // withCredentials 옵션과 동일
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const data = await response.json();

      const hasTimes = data?.filter(e => e.course_type === '18');
      const teeTimes = hasTimes[0]?.pk;

      if (!teeTimes) {
        alert('No teeTimes');
        return;
      }

      document.querySelector('#id_teetime').value = teeTimes;
      document.querySelector('#submit_btn').click();
    })
}

reservation();