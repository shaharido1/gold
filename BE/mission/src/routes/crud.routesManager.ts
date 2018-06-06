import { CrudMethod } from "../dbModule/methods/crud.method";
import { LogService } from "../logs/logHandler";


export class CrudRoutesManager {
  crudMethods: CrudMethod;
  logService: LogService;
  entityName: string;

  constructor(entityMethods, entityName, logService) {
    this.crudMethods = entityMethods;
    this.entityName = entityName;
    this.logService = logService || {
      log : (log) => console.log(log),
      error : (err) => console.log(err)
    };
  }

  test(req, res) {
    return res.status(200).send("hello");
  }

  getById(req, res) {
    this.crudMethods.get(req.query[this.entityName + "Id"])
        .then(entity => res.status(200).send(entity))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })
    ;
  }

  add(req, res) {
    this.crudMethods.add(req.body[this.entityName])
        .then(entity => res.status(200).send(entity))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })
  }

  getAll(req, res) {
    this.crudMethods.getAll()
        .then(entities => res.status(200).send(entities))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })
  }

  update(req, res) {
    this.crudMethods.update(req.body[this.entityName])
        .then(entity => res.status(200).send(entity))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })

  }

  updateField(req, res) {
    this.crudMethods.updateField(req.body["id"], req.body[this.entityName])
        .then(entity => res.status(200).send(entity))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })

  }
  remove(req, res) {
    this.crudMethods.remove(req.body["id"])
        .then(entity => res.status(200).send(entity))
        .catch(err => {
          this.logService.error(err);
          res.status(500).send(err);
        })

  }


}