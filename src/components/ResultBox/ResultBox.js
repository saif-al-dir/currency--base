import React, { useMemo } from 'react';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {

  // Handle negative amounts early
  if (amount < 0) {
    return (
      <div className={styles.result} data-testid="output">
        Wrong value…
      </div>
    );
  }

  // Calculate converted amount and formatted amount
  const convertedAmount = useMemo(() => {
    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  return (
    <div className={styles.result} data-testid="output">
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

export default ResultBox;