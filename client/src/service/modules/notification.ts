import api from "..";

class DeliverableService {

  static getDeliverables() {
    return api({
      method: 'GET',
      url: '/deliverables',
    })
  }


  static getDeliverableById(deliverableId: number) {
    return api({
      method: 'GET',
      url: `/deliverables/${deliverableId}`,
    })
  }
}

export default DeliverableService;
