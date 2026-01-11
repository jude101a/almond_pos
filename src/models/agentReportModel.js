export default class AgentReportModel {
  constructor({
    agentName = "",
    closingCash = 0,
    posBalance = 0,
    addedCash = 0,
    removedFunds = 0,
    startingMoney = 0,
    startingCash = 0,
    commissionRate = 0.015,
    date = new Date(),
  } = {}) {
    this.agentName = agentName;
    this.closingCash = Number(closingCash);
    this.posBalance = Number(posBalance);
    this.addedCash = Number(addedCash);
    this.removedFunds = Number(removedFunds);
    this.startingMoney = Number(startingMoney);
    this.startingCash = Number(startingCash);
    this.commissionRate = Number(commissionRate);
    this.date = new Date(date);
  }

  /* -------- Computed values -------- */

  get totalCash() {
    return this.startingCash + this.addedCash;
  }

  get processedTotal() {
    return this.totalCash - this.closingCash;
  }

  get calculatedCommission() {
    return this.processedTotal * this.commissionRate;
  }

  get expectedTotalWithoutCommission() {
    return this.startingMoney + this.addedCash - this.removedFunds;
  }

  get actualTotal() {
    return (
      this.posBalance +
      this.closingCash +
      this.addedCash -
      this.removedFunds
    );
  }

  get actualCommission() {
    return this.actualTotal - this.expectedTotalWithoutCommission;
  }

  get topping() {
    return this.actualCommission - this.calculatedCommission;
  }

  get status() {
    if (this.actualCommission < this.calculatedCommission) return "Shortage";
    if (this.actualCommission > this.calculatedCommission + 10000)
      return "Excess";
    return "Balanced";
  }

  /* -------- Serialization -------- */

  toJson() {
    return {
      agent_name: this.agentName,
      closing_cash: this.closingCash,
      pos_balance: this.posBalance,
      added_cash: this.addedCash,
      removed_funds: this.removedFunds,
      starting_money: this.startingMoney,
      starting_cash: this.startingCash,
      commission_rate: this.commissionRate,
      date: this.date,

      total_cash: this.totalCash,
      processed_total: this.processedTotal,
      calculated_commission: this.calculatedCommission,
      expected_total_without_commission:
        this.expectedTotalWithoutCommission,
      actual_total: this.actualTotal,
      actual_commission: this.actualCommission,
      topping: this.topping,
      status: this.status,
    };
  }

  static fromRow(row) {
    return new AgentReportModel({
      agentName: row.agent_name,
      closingCash: row.closing_cash,
      posBalance: row.pos_balance,
      addedCash: row.added_cash,
      removedFunds: row.removed_funds,
      startingMoney: row.starting_money,
      startingCash: row.starting_cash,
      commissionRate: row.commission_rate,
      date: row.date,
    });
  }
}
