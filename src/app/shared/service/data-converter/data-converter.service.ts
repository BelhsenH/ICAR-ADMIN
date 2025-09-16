import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {NewRelayPoint} from "../../models/api-request/referential/new-relay-point.model";
import * as _ from 'lodash';
import {PaymentTransaction} from "../../models/billing/payment-transaction.model";
import {RelayPoint} from "../../models/relay-point/relay-point.model";

@Injectable({
  providedIn: 'root',
})
export class DataConverterService {

  constructor() {
  }

  /**
   *   relay points
   */

  convertDatesFromServerForRelayPoints(relayPoints: RelayPoint[]): RelayPoint[] {
    if (relayPoints) {
      relayPoints.forEach((relayPoint) => (this.convertDatesFromServerForRelayPoint(relayPoint)));
    }
    return relayPoints;
  }

  convertDatesFromServerForRelayPoint(relayPoint: RelayPoint): RelayPoint {
    if (relayPoint) {
      if (relayPoint.hoursOfOperation.monday.morningPeriod)
        relayPoint.hoursOfOperation.monday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.monday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.tuesday.morningPeriod)
        relayPoint.hoursOfOperation.tuesday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.tuesday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.wednesday.morningPeriod)
        relayPoint.hoursOfOperation.wednesday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.wednesday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.thursday.morningPeriod)
        relayPoint.hoursOfOperation.thursday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.thursday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.friday.morningPeriod)
        relayPoint.hoursOfOperation.friday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.friday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.saturday.morningPeriod)
        relayPoint.hoursOfOperation.saturday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.saturday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.sunday.morningPeriod)
        relayPoint.hoursOfOperation.sunday.morningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.sunday.morningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.monday.eveningPeriod)
        relayPoint.hoursOfOperation.monday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.monday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.tuesday.eveningPeriod)
        relayPoint.hoursOfOperation.tuesday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.tuesday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.wednesday.eveningPeriod)
        relayPoint.hoursOfOperation.wednesday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.wednesday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.thursday.eveningPeriod)
        relayPoint.hoursOfOperation.thursday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.thursday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.friday.eveningPeriod)
        relayPoint.hoursOfOperation.friday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.friday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.saturday.eveningPeriod)
        relayPoint.hoursOfOperation.saturday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.saturday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.sunday.eveningPeriod)
        relayPoint.hoursOfOperation.sunday.eveningPeriod.openingTime = new Date((relayPoint.hoursOfOperation.sunday.eveningPeriod.openingTime as any) * 1000);
      if (relayPoint.hoursOfOperation.monday.morningPeriod)
        relayPoint.hoursOfOperation.monday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.monday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.tuesday.morningPeriod)
        relayPoint.hoursOfOperation.tuesday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.tuesday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.wednesday.morningPeriod)
        relayPoint.hoursOfOperation.wednesday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.wednesday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.thursday.morningPeriod)
        relayPoint.hoursOfOperation.thursday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.thursday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.friday.morningPeriod)
        relayPoint.hoursOfOperation.friday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.friday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.saturday.morningPeriod)
        relayPoint.hoursOfOperation.saturday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.saturday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.sunday.morningPeriod)
        relayPoint.hoursOfOperation.sunday.morningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.sunday.morningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.monday.eveningPeriod)
        relayPoint.hoursOfOperation.monday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.monday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.tuesday.eveningPeriod)
        relayPoint.hoursOfOperation.tuesday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.tuesday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.wednesday.eveningPeriod)
        relayPoint.hoursOfOperation.wednesday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.wednesday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.thursday.eveningPeriod)
        relayPoint.hoursOfOperation.thursday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.thursday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.friday.eveningPeriod)
        relayPoint.hoursOfOperation.friday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.friday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.saturday.eveningPeriod)
        relayPoint.hoursOfOperation.saturday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.saturday.eveningPeriod.closureTime as any) * 1000);
      if (relayPoint.hoursOfOperation.sunday.eveningPeriod)
        relayPoint.hoursOfOperation.sunday.eveningPeriod.closureTime = new Date((relayPoint.hoursOfOperation.sunday.eveningPeriod.closureTime as any) * 1000);
    }
    return relayPoint;
  }

  convertDatesFromClientForNewRelayPoint(relayPoint: NewRelayPoint): NewRelayPoint {
    const newRelayPoint: NewRelayPoint = _.cloneDeep(relayPoint);
    if (newRelayPoint.hoursOfOperation) {
      if (newRelayPoint.hoursOfOperation.monday.morningPeriod)
        newRelayPoint.hoursOfOperation.monday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.monday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.tuesday.morningPeriod)
        newRelayPoint.hoursOfOperation.tuesday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.tuesday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.wednesday.morningPeriod)
        newRelayPoint.hoursOfOperation.wednesday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.wednesday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.thursday.morningPeriod)
        newRelayPoint.hoursOfOperation.thursday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.thursday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.friday.morningPeriod)
        newRelayPoint.hoursOfOperation.friday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.friday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.saturday.morningPeriod)
        newRelayPoint.hoursOfOperation.saturday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.saturday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.sunday.morningPeriod)
        newRelayPoint.hoursOfOperation.sunday.morningPeriod.openingTime = (newRelayPoint.hoursOfOperation.sunday.morningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.monday.eveningPeriod)
        newRelayPoint.hoursOfOperation.monday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.monday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.tuesday.eveningPeriod)
        newRelayPoint.hoursOfOperation.tuesday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.tuesday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.wednesday.eveningPeriod)
        newRelayPoint.hoursOfOperation.wednesday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.wednesday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.thursday.eveningPeriod)
        newRelayPoint.hoursOfOperation.thursday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.thursday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.friday.eveningPeriod)
        newRelayPoint.hoursOfOperation.friday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.friday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.saturday.eveningPeriod)
        newRelayPoint.hoursOfOperation.saturday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.saturday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.sunday.eveningPeriod)
        newRelayPoint.hoursOfOperation.sunday.eveningPeriod.openingTime = (newRelayPoint.hoursOfOperation.sunday.eveningPeriod.openingTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.monday.morningPeriod)
        newRelayPoint.hoursOfOperation.monday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.monday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.tuesday.morningPeriod)
        newRelayPoint.hoursOfOperation.tuesday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.tuesday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.wednesday.morningPeriod)
        newRelayPoint.hoursOfOperation.wednesday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.wednesday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.thursday.morningPeriod)
        newRelayPoint.hoursOfOperation.thursday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.thursday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.friday.morningPeriod)
        newRelayPoint.hoursOfOperation.friday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.friday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.saturday.morningPeriod)
        newRelayPoint.hoursOfOperation.saturday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.saturday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.sunday.morningPeriod)
        newRelayPoint.hoursOfOperation.sunday.morningPeriod.closureTime = (newRelayPoint.hoursOfOperation.sunday.morningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.monday.eveningPeriod)
        newRelayPoint.hoursOfOperation.monday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.monday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.tuesday.eveningPeriod)
        newRelayPoint.hoursOfOperation.tuesday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.tuesday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.wednesday.eveningPeriod)
        newRelayPoint.hoursOfOperation.wednesday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.wednesday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.thursday.eveningPeriod)
        newRelayPoint.hoursOfOperation.thursday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.thursday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.friday.eveningPeriod)
        newRelayPoint.hoursOfOperation.friday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.friday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.saturday.eveningPeriod)
        newRelayPoint.hoursOfOperation.saturday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.saturday.eveningPeriod.closureTime as Date).getTime() / 1000;
      if (newRelayPoint.hoursOfOperation.sunday.eveningPeriod)
        newRelayPoint.hoursOfOperation.sunday.eveningPeriod.closureTime = (newRelayPoint.hoursOfOperation.sunday.eveningPeriod.closureTime as Date).getTime() / 1000;
    }
    return newRelayPoint;
  }

  /**
   *   Payments transactions
   */

  convertDatesFromServerForPaymentTransactions(paymentTransactions: PaymentTransaction[]): PaymentTransaction[] {
    if (paymentTransactions) {
      paymentTransactions.forEach((paymentTransaction) => (this.convertDatesFromServerForPaymentTransaction(paymentTransaction)));
    }
    return paymentTransactions;
  }

  convertDatesFromServerForPaymentTransaction(paymentTransaction: PaymentTransaction): PaymentTransaction {
    if (paymentTransaction) {
      paymentTransaction.transactionDate = paymentTransaction.transactionDate ? moment.unix(paymentTransaction.transactionDate as any) : undefined!;
      if (paymentTransaction.invoice)
        paymentTransaction.invoice.createdAt = paymentTransaction.invoice?.createdAt ? moment.unix(paymentTransaction.invoice.createdAt as any) : undefined!;
    }
    return paymentTransaction;
  }
}
