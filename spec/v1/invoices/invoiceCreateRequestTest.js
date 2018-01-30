'use strict';

require('../../spec_helper');

const chai = require('chai');
const client = require('../../test_harness').client();
const InvoiceCreateRequest = paypal.v1.invoices.InvoiceCreateRequest;

function buildRequestBody() {
	return {
		"merchant_info": {
			"email": "team-dx-clients-facilitator@getbraintree.com",
			"first_name": "Dennis",
			"last_name": "Doctor",
			"business_name": "Medical Professionals, LLC",
			"phone": {
				"country_code": "001",
				"national_number": "5032141716"
			},
			"address": {
				"line1": "1234 Main St.",
				"city": "Portland",
				"state": "OR",
				"postal_code": "97217",
				"country_code": "US"
			}
		},
		"billing_info": [{
			"email": "example@example.com"
		}],
		"items": [{
			"name": "Sutures",
			"quantity": 100.0,
			"unit_price": {
				"currency": "USD",
				"value": 5
			}
		}],
		"note": "Medical Invoice 16 Jul, 2013 PST",
		"payment_term": {
			"term_type": "NET_45"
		},
		"shipping_info": {
			"first_name": "Sally",
			"last_name": "Patient",
			"business_name": "Not applicable",
			"phone": {
				"country_code": "001",
				"national_number": "5039871234"
			},
			"address": {
				"line1": "1234 Broad St.",
				"city": "Portland",
				"state": "OR",
				"postal_code": "97216",
				"country_code": "US"
			}
		},
		"tax_inclusive": false,
		"total_amount": {
			"currency": "USD",
			"value": "500.00"
		}
	};
}

function invoiceCreate() {
  let request = new InvoiceCreateRequest();
  request.requestBody(buildRequestBody());

  return client.execute(request);
}

describe('InvoiceCreateRequest', function () {
	it('works as expected', function () {
    return invoiceCreate().then(function(r) {
			chai.assert.equal(r.statusCode, 201);
			chai.assert.isNotNull(r.result);
    });
	});
});

module.exports = {
  InvoiceCreate: invoiceCreate
}
