import 'dayjs/locale/de';
import 'dayjs/locale/en';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default dayjs;
