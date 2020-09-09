var url1 =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
function Evento(fnombre, fcantidad) {
  this.nombre = fnombre;
  this.cantidad = fcantidad;
}
let eventosRep = [];
let mccOrdenar = [];

fetch(url1)
  .then((response1) => response1.json())
  .then((response) => {
    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < response[i].events.length; j++) {
        eventosRep.push(response[i].events[j]);
      }
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      const eventos = document.createElement("td");
      const squirr = document.createElement("td");
      id.scope = "col";
      id.textContent = i + 1;
      eventos.scope = "col";
      eventos.textContent = response[i].events;
      squirr.scope = "col";
      squirr.textContent = response[i].squirrel;
      tr.appendChild(id);
      tr.appendChild(eventos);
      tr.appendChild(squirr);
      if (response[i].squirrel) {
        tr.style.backgroundColor = "lightpink";
      }

      document.getElementById("bodyTableEvents").appendChild(tr);
    }

    let eventosFin = eventosRep.filter((c, index) => {
      return eventosRep.indexOf(c) === index;
    });

    for (let a = 0; a < eventosFin.length; a++) {
      let nom = eventosFin[a];
      let cont = 0;

      let tn = 0;
      let fn = 0;
      let fp = 0;
      let tp = 0;

      for (let b = 0; b < response.length; b++) {
        let estaEv = false;
        let c = 0;
        while (c < response[b].events.length) {
          if (response[b].events[c] === eventosFin[a]) {
            cont++;
            estaEv = true;
          }
          c = c + 1;
        }
        if (estaEv) {
          if (response[b].squirrel === true) {
            tp = tp + 1;
          } else {
            fn = fn + 1;
          }
        } else {
          response[b].squirrel === true ? (fp = fp + 1) : (tn = tn + 1);
        }
      }

      let numerador = tp * tn - fp * fn;
      let denominador = Math.sqrt(
        (tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)
      );
      let mcc = numerador / denominador;
      let ev = new Evento(eventosFin[a], mcc);
      mccOrdenar.push(ev);
    }

    mccOrdenar.sort((a, b) => {
      return a.cantidad - b.cantidad;
    });

    for (let h = 0; h < mccOrdenar.length; h++) {
      let actual = mccOrdenar[Math.abs(mccOrdenar.length - 1 - h)];
      let tr2 = document.createElement("tr");
      let id2 = document.createElement("td");
      let eventos2 = document.createElement("td");
      let mcc2 = document.createElement("td");
      id2.scope = "col";
      id2.textContent = h + 1;
      eventos2.scope = "col";
      eventos2.textContent = actual.nombre;
      mcc2.scope = "col";
      mcc2.textContent = actual.cantidad;
      tr2.appendChild(id2);
      tr2.appendChild(eventos2);
      tr2.appendChild(mcc2);
      document.getElementById("bodyTableCorr").appendChild(tr2);
    }
  })
  .catch((error) => console.log(error));
