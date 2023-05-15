import json
from datetime import datetime

with open("emprego-cientifico.json") as f:
    data = json.load(f)
    for id, emprego in enumerate(data):
        if emprego["DataFimContrato"] != "":
            emprego["DataFimContrato"] = {
                "$date": {
                    "$numberLong": datetime.strptime(
                        emprego["DataFimContrato"], "%d/%m/%Y"
                    ).strftime("%s")
                    + "000"
                }
            }
        else:
            emprego["DataFimContrato"] = None

        if emprego["DataInicioContrato"] != "":
            emprego["DataInicioContrato"] = {
                "$date": {
                    "$numberLong": datetime.strptime(
                        emprego["DataInicioContrato"], "%d/%m/%Y"
                    ).strftime("%s")
                    + "000"
                }
            }
        else:
            emprego["DataInicioContrato"] = None
    with open("processado.json", "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
