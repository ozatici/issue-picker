import '@testing-library/jest-dom'
import { formatDate } from '../TableFormatUtil';

describe('TableFormatUtil', () => {
    it('should modify a date from ISO to a readable format', () => {
        const date = '2024-02-22T20:12:27Z';

        expect(formatDate(date)).toEqual('22/2/24')

    })
})