import json
from datetime import datetime

with open("emprego-cientifico.json") as f:
    data = json.load(f)
    for id, emprego in enumerate(data):
        toDelete = []
        for k, v in emprego.items():
            if v == "":
                toDelete.append(k)
        for k in toDelete:
            del emprego[k]
        if "DataFimContrato" in emprego:
            emprego["DataFimContrato"] = {
                "$date": {
                    "$numberLong": datetime.strptime(
                        emprego["DataFimContrato"], "%d/%m/%Y"
                    ).strftime("%s")
                    + "000"
                }
            }

        if "DataInicioContrato" in emprego:
            emprego["DataInicioContrato"] = {
                "$date": {
                    "$numberLong": datetime.strptime(
                        emprego["DataInicioContrato"], "%d/%m/%Y"
                    ).strftime("%s")
                    + "000"
                }
            }
    with open("processado.json", "w") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
