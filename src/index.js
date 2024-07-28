import { ROLLUP_SERVER } from './middleware/stateHandler';
import { hexToString } from 'viem';
import StateHandler from './middleware/stateHandler';
import routes from './routes';

const rollup_server = ROLLUP_SERVER;
console.log('HTTP rollup_server url is ' + rollup_server);

/**
 * ### Incoming advance data common schema:
 *@param {*} data {
 *     "metadata": {
 *         "msg_sender": "0x...",
 *         "epoch_index": number,
 *         "input_index": number,
 *         "block_number": number,
 *         "timestamp": number
 *     },
 *     "payload": "0x..."
 *   }
 */
async function handle_advance(data) {
    console.log('Received advance raw data ->', JSON.stringify(data));
    const payloadRaw = hexToString(data.payload);
    const payload = JSON.parse(payloadRaw);
    const requestedAction = payload.action;
    const providedData = payload.data;

    const action = routes[requestedAction];

    if (!action) {
        return await StateHandler.handleReport({
            error: `Action '${requestedAction}' not allowed.`,
        });
    }

    const controllerResponse = await action(providedData);

    return controllerResponse;
}

/**
 * ### Incoming inspect data common schema:
 * @param {*} data {"payload": "0x..."}
 */
async function handle_inspect(data) {
    console.log('Received inspect raw data ->', JSON.stringify(data));
    const urlParams = hexToString(data.payload);
    const urlParamsSplited = urlParams.split('/');
    const requestedAction = urlParamsSplited[0];
    const providedData = urlParamsSplited.slice(1);
    const action = routes[requestedAction];

    if (!action) {
        return await StateHandler.handleReport({
            error: `Action '${requestedAction}' not allowed.`,
        });
    }

    const controllerResponse = await action(providedData);

    return controllerResponse;
}

var handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
};

var finish = { status: 'accept' };

(async () => {
    while (true) {
        const finish_req = await fetch(rollup_server + '/finish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'accept' }),
        });

        console.log('Received finish status ' + finish_req.status);

        if (finish_req.status == 202) {
            console.log('No pending rollup request, trying again');
        } else {
            const rollup_req = await finish_req.json();
            var handler = handlers[rollup_req['request_type']];
            finish['status'] = await handler(rollup_req['data']);
        }
    }
})();
