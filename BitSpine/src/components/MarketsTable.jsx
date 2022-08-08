import React from 'react';
import { CONSTANTS } from '../constants';

const MarketsTable = () => {
  return (
    <div className="bg-gray-700 p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="py-3 px-3 text-left border-b-2 border-gray-500 bg-gray-700  text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Assets
                  </th>
                  <th className="py-3 text-center border-b-2 border-gray-500 bg-gray-700  text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Total Supply
                  </th>
                  <th className="py-3 text-center border-b-2 border-gray-500 bg-gray-700  text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Supply APY
                  </th>
                  <th className="py-3 text-center border-b-2 border-gray-500 bg-gray-700  text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Total Borrow
                  </th>
                  <th className="py-3 text-center border-b-2 border-gray-500 bg-gray-700  text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Borrow APY
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONSTANTS.ORACLEDATA.map((e) => (
                  <tr key={e.underlying_name}>
                    <td className="py-5  border-b border-gray-500 bg-gray-700 text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={`https://compound.finance/compound-components/assets/asset_${e.underlying_symbol}.svg`}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-gray-200 font-bold whitespace-nowrap">
                            {e.underlying_name}
                          </div>
                          <div className="text-gray-300 whitespace-nowrap">
                            {e.underlying_symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-center border-b border-gray-500 bg-gray-700 text-sm">
                      <div className="text-gray-200 font-normal whitespace-nowrap">
                        ${e.total_supply.value.slice(0, 4)}
                      </div>
                    </td>
                    <td className="py-5 text-center border-b border-gray-500 bg-gray-700 text-sm">
                      <p className="text-gray-200 whitespace-nowrap self-center ml-1">
                        {e.comp_supply_apy.value.slice(0, 4)}%
                      </p>
                    </td>
                    <td className="py-5 text-center border-b border-gray-500 bg-gray-700 text-sm">
                      <div className="text-gray-200 whitespace-nowrap">
                        ${e.total_borrows.value.slice(0, 4)}
                      </div>
                    </td>
                    <td className="py-5 text-center border-b border-gray-500 bg-gray-700 text-sm">
                      <div className="text-gray-200 whitespace-nowrap">
                        {e.comp_borrow_apy.value.slice(0, 4)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsTable;
