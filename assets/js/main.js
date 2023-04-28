/*=============== BATTERY ===============*/
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')

    navigator.getBattery().then((batt) =>{  
        updateBattery = () =>{
            /* 1. Ini persentase total baterai */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            /* 2. Background level dari total persentase baterai */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. Ini untuk memvalidasi baterai penuh, baterai lemah, dan apakah baterai sedang dalam proses pengisian atau tidak. */
            if(level == 100){ /*Ini proses validasi jika baterai sedang penuh. */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '100%'  /* To hide the ellipse */   
            }
            else if(level <= 20 &! batt.charging){ /* Ini proses validasi jika baterai sedang lemah. */
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* Ini proses validasi jika baterai sedang dalam pengisian */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* Jika sedang tidak mengisi atau status apapun kecuali lemah, jangan tampilkan apapun. */
                batteryStatus.innerHTML = ''
            }

            /* 4. Ini untuk proses berubah warna baterai sesuai persentase. */
            if(level <= 20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 5. Battery status events */
        batt.addEventListener('chargingchange',() => {updateBattery()})
        batt.addEventListener('levelchange',() => {updateBattery()})
})
}
