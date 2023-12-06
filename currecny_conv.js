function convertMoneyToWords(amount) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion'];
  
    if (amount === 0) {
      return 'zero dollars';
    }
  
    const dollars = Math.floor(amount);
    //here i need to solve that 'after deicaml cent to dollar' issue
    const cents = Math.round((amount - dollars) * 100);
    const dollarsWords = convertNumberToWords(dollars,units,teens,tens, scales);
    const centsWords = convertNumberToWords(cents,units,teens,tens,scales);
  
    let result = '';
  
    if (dollarsWords) {
      result += dollarsWords + ' dollar';
      if (dollars !== 1) {
        result += 's';
      }
    }
  
    if (centsWords) {
      if (dollarsWords) {
        result += ' and ';
      }
      result += centsWords + ' cent';
      if (cents !== 1) {
        result += 's';
      }
    }
  
    return result;
  }
  
  function convertNumberToWords(number,units,teens,tens, scales) {
    if (number < 0 || number > 999999999999) {
      throw new Error('Number out of range');
    }
  
    if (number === 0) {
      return 'zero';
    }
  
    let words = '';
  
    for (let i = scales.length - 1; i >= 0; i--) {
      const scale = Math.pow(1000, i);
  
      if (number >= scale) {
        const count = Math.floor(number / scale);
        number %= scale;
  
        if (count > 0) {
          const hundreds = Math.floor(count / 100);
          const tensUnits = count % 100;
  
          if (hundreds > 0) {
            words += `${units[hundreds]} hundred `;
          }
  
          if (tensUnits >= 10 && tensUnits < 20) {
            words += `${teens[tensUnits - 10]} `;
          } else if (tensUnits >= 20) {
            words += `${tens[Math.floor(tensUnits / 10)]} `;
            if (tensUnits % 10 > 0) {
              words += `${units[tensUnits % 10]} `;
            }
          } else if (tensUnits > 0) {
            words += `${units[tensUnits]} `;
          }
  
          words += `${scales[i]} `;
        }
      }
    }
  
    return words.trim();
  }
  
//   const amount = 1234.56;
//   const words = convertMoneyToWords(amount);
//   console.log(words); // Output: "one thousand two hundred thirty-four dollars and fifty-six cents"
  


// **** For INR *****

function convertToINR(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    if (number === 0) {
      return 'zero';
    }
  
    if (number < 0 || number > 999999999999.99) {
      throw new Error('Number out of range');
    }
  
    const parts = Number(number).toFixed(2).split('.');
    let integerPart = parseInt(parts[0]);
    let decimalPart = parseInt(parts[1]);
  
    let txt = '';
  
    if (integerPart >= 1000000000) {
      const billions = Math.floor(integerPart / 1000000000);
      txt += convertThreeDigitNumberTotxt(billions) + ' billion ';
      integerPart %= 1000000000;
    }
  
    if (integerPart >= 10000000) {
      const crores = Math.floor(integerPart / 10000000);
      txt += convertTwoDigitNumberTotxt(crores) + ' crore ';
      integerPart %= 10000000;
    }
  
    if (integerPart >= 100000) {
      const lakhs = Math.floor(integerPart / 100000);
      txt += convertThreeDigitNumberTotxt(lakhs) + ' lakh ';
      integerPart %= 100000;
    }
  
    if (integerPart >= 1000) {
      const thousands = Math.floor(integerPart / 1000);
      txt += convertThreeDigitNumberTotxt(thousands) + ' thousand ';
      integerPart %= 1000;
    }
  
    if (integerPart > 0) {
      txt += convertThreeDigitNumberTotxt(integerPart);
    }
  
    txt += ' Rupees';
  
    if (decimalPart > 0) {
      txt += ' and ' + convertTwoDigitNumberTotxt(decimalPart) + ' Paise';
    }
  
    return txt.trim();
  }
  
  function convertThreeDigitNumberTotxt(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    let txt = '';
  
    const hundreds = Math.floor(number / 100);
    const tensUnits = number % 100;
  
    if (hundreds > 0) {
      txt += units[hundreds] + ' hundred ';
    }
  
    if (tensUnits >= 10 && tensUnits < 20) {
      txt += teens[tensUnits - 10] + ' ';
    } else if (tensUnits >= 20) {
      txt += tens[Math.floor(tensUnits / 10)] + ' ';
      if (tensUnits % 10 > 0) {
        txt += units[tensUnits % 10] + ' ';
      }
    } else if (tensUnits > 0) {
      txt += units[tensUnits] + ' ';
    }
  
    return txt.trim();
  }
  
  function convertTwoDigitNumberTotxt(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    let txt = '';
  
    if (number >= 10 && number < 20) {
      txt += teens[number - 10] + ' ';
    } else if (number >= 20) {
      txt += tens[Math.floor(number / 10)] + ' ';
      if (number % 10 > 0) {
        txt += units[number % 10] + ' ';
      }
    } else if (number > 0) {
      txt += units[number] + ' ';
    }
  
    return txt.trim();
  }
  
  const num = 123456789.99;
  const txt = convertToINR(num);
  console.log(txt); // Output: "twelve crore thirty-four lakh fifty-six thousand seven hundred eighty-nine rupees and ninety-nine paise"
  
 // END of INR conv func 



// ***********  To Euro   ******************

function convertToEuro(number) {
    const units = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
  
    const tens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
  
    function convertLessThanOneThousand(number) {
      let current = number;
      let words = '';
  
      if (current % 100 < 20) {
        words += units[current % 100];
        current = Math.floor(current / 100);
      } else {
        words += units[current % 10];
        current = Math.floor(current / 10);
  
        if (current % 10 !== 0) {
          words = tens[Math.floor(current % 10)] + ' ' + words;
        }
        current = Math.floor(current / 10);
      }
  
      if (current > 0) {
        words = units[current] + ' hundred ' + words;
      }
  
      return words.trim();
    }
  
    function numberToWordsWithDecimals(number) {
      if (number === 0) {
        return 'zero euro';
      } else {
        let words = '';
        let cents = Math.round((number % 1) * 100);
  
        number = Math.floor(number);
  
        if (number >= 1e12) {
          words += convertLessThanOneThousand(Math.floor(number / 1e12)) + ' trillion ';
          number %= 1e12;
        }
        if (number >= 1e9) {
          words += convertLessThanOneThousand(Math.floor(number / 1e9)) + ' billion ';
          number %= 1e9;
        }
        if (number >= 1e6) {
          words += convertLessThanOneThousand(Math.floor(number / 1e6)) + ' million ';
          number %= 1e6;
        }
        if (number >= 1e3) {
          words += convertLessThanOneThousand(Math.floor(number / 1e3)) + ' thousand ';
          number %= 1e3;
        }
  
        words += convertLessThanOneThousand(number);
        words += " euro";
  
        if (cents > 0) {
          words += ' and ' + convertLessThanOneThousand(cents) + ' cent';
        }
  
        return words;
      }
    }
  
    return numberToWordsWithDecimals(number);
  }
  
  
// End of EURO conv function

function displayText()
{
    var nm=document.getElementById("country").value;
    document.getElementById("curr_nm").innerHTML=nm;
    var a;
    a=document.getElementById("num1").value;
    const amount = a;
    if(nm=='USD')
    {
        document.getElementById("nt1").innerHTML='Note: 1 Dollar = 100 Cents'
        const words = convertMoneyToWords(amount);
        document.getElementById("l1").innerHTML=words
    }
    else if(nm=='INR')
    {
        document.getElementById("nt1").innerHTML='Note: 1 Rupee = 100 Pasie'
        const words = convertToINR(amount);
        document.getElementById("l1").innerHTML=words
    }
    else if(nm=='EUR')
    {
        document.getElementById("nt1").innerHTML='Note: 1 Euro = 100 Cents'
        const words = convertToEuro(amount);
        document.getElementById("l1").innerHTML=words
    }
}

