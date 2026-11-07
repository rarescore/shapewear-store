const weightInput = document.getElementById('weight);
const skipBtn = document.getElementById('skip);
const extraFields = document.getElementById('extra-fields);
const waistInput = document.getElementById('waist);
const hipInput = document.getElementById('hip);
const underbustInput = document.getElementById('underbust);
const calculateBtn = document.getElementById('calculate);
const resultDiv = document.getElementById('result);
const saveBtn = document.getElementById('save);
const shopLink = document.getElementById('shop-link);

skipBtn.addEventListener('click', () => {
  extraFields.hidden = false;
  skipBtn.hidden = true;
});

function getSize(waist, hip, underbust) {
  // Placeholder ranges — replace with real grading data from samples
  if (waist < 28 && hip < 38) return 'XS';
  if (waist < 30 && hip < 40) return 'S';
  if (waist < 33 && hip < 43) return 'M';
  if (waist < 36 && hip < 46) return 'L';
  if (waist < 39 && hip < 49) return 'XL';
  return '2XL–3XL';
}

calculateBtn.addEventListener('click', () => {
  const weight = parseFloat(weightInput.value);
  let waist = parseFloat(waistInput.value);
  let hip = parseFloat(hipInput.value);
  const underbust = parseFloat(underbustInput.value);

  // If only weight given, estimate waist/hip from it (rough placeholder)
  if (!waist && weight) {
    waist = Math.round(weight * 0.45);
    hip = Math.round(weight * 0.62);
  }
  if (!waist || !hip) {
    resultDiv.textContent = 'Enter at least weight, or waist and hip.';
    resultDiv.hidden = false;
    return;
  }

  const size = getSize(waist, hip, underbust);
  resultDiv.innerHTML = `<strong>Recommended: ${size}</strong><br>Bodysuit: ${size} · Brief: ${size} · Premium panel: ${size}`;
  resultDiv.hidden = false;
  saveBtn.hidden = false;
  shopLink.hidden = false;
  shopLink.search = `?size=${size}`;
});

saveBtn.addEventListener('click', () => {
  const email = prompt('Enter your email to save your measurements:);
  if (email) {
    localStorage.setItem('shapewear_measurements', JSON.stringify({
      weight: weightInput.value,
      waist: waistInput.value,
      hip: hipInput.value,
      underbust: underbustInput.value,
      email
    }));
    saveBtn.textContent = 'Saved ✓';
  }
});
