let a = document.querySelector("input[name='api']");
let xmlhttp = new XMLHttpRequest();
let url = `https://api.ipfind.com/me?auth=${a.value}`;

xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
      let result = JSON.parse(this.responseText);
      let _continent = result.continent;
      let _country = result.country;
      let _city = result.city;
      let _ip = result.ip_address;
      let input_country = document.getElementById('country'),
      input_ip = document.getElementById('ip');
      input_ip.value = _ip;
      input_country.value = _continent +", "+ _country +", "+ _city;
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
