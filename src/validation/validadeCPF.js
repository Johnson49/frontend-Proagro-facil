
export function validadeCPF(cpf) {

    cpf = cpf.replace(/\.|-/g, "");
    let soma = 0;
    soma += cpf[0] * 10;
    soma += cpf[1] * 9;
    soma += cpf[2] * 8;
    soma += cpf[3] * 7;
    soma += cpf[4] * 6;
    soma += cpf[5] * 5;
    soma += cpf[6] * 4;
    soma += cpf[7] * 3;
    soma += cpf[8] * 2;
    soma = (soma * 10) % 11;
    if (soma == 10 || soma == 11) {
      soma = 0;
    }
    if (soma != cpf[9]) {
      return false;
    }
    soma = 0;
    soma += cpf[0] * 11;
    soma += cpf[1] * 10;
    soma += cpf[2] * 9;
    soma += cpf[3] * 8;
    soma += cpf[4] * 7;
    soma += cpf[5] * 6;
    soma += cpf[6] * 5;
    soma += cpf[7] * 4;
    soma += cpf[8] * 3;
    soma += cpf[9] * 2;
    soma = (soma * 10) % 11;
    if (soma == 10 || soma == 11) {
      soma = 0;
    }
  
    if (soma != cpf[10]) {
      return false;
    }
    return true;
  }

