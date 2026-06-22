/* ================= G2 COMPANY TRIP 2026 — data + interactions ================= */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  /* ---------- palette for dynamic accents ---------- */
  const COLORS = ['#00AEEF', '#FFD93D', '#34C759', '#FF8A3D', '#FF6B6B', '#006C9A', '#9b59ff', '#19b3e6'];

  /* ============ DATA ============ */
  const CHECKPOINTS = [
    { n: '01', t: 'Check-in', lab: 'Danh sách hành khách', ic: '🧳', c: '#00AEEF' },
    { n: '02', t: 'Lịch trình', lab: 'Lịch trình chi tiết', ic: '🗺️', c: '#FFD93D' },
    { n: '03', t: 'Khách sạn', lab: 'Thông tin lưu trú', ic: '🏨', c: '#34C759' },
    { n: '04', t: 'Team Building', lab: 'Chơi hết mình', ic: '🎯', c: '#FF8A3D' },
    { n: '05', t: 'Khám phá', lab: 'Điểm đến thú vị', ic: '📸', c: '#19b3e6' },
    { n: '06', t: 'Food Paradise', lab: 'Ăn là ghiền', ic: '🍤', c: '#FF6B6B' },
    { n: '07', t: 'Gala Night', lab: 'Đêm không quên', ic: '🎆', c: '#9b59ff' },
    { n: '08', t: 'Kỷ niệm', lab: 'Những khoảnh khắc', ic: '📷', c: '#006C9A' },
  ];
  const CK_TARGETS = ['#hotel', '#itinerary', '#hotel', '#team', '#explore', '#food', '#gala', '#footer'];

  let ITINERARY = [
    {
      day: 'Ngày 1 (31/7-Thứ 6)', sub: 'HÀ NỘI → HẠ LONG → TEAM BUILDING', items: [
        { time: '09:15', t: 'Xe và HDV đón đoàn tại công ty đi Hạ Long.', ic: '🚌', d: 'Xe và Hướng dẫn viên đón đoàn tại công ty, bắt đầu hành trình mùa hè.', loc: 'Hà Nội', note: 'Tập trung đúng giờ' },
        { time: '10:30', t: 'Đến Quảng Ninh – Bảo tàng Quảng Ninh.', ic: '🏛️', d: 'Đoàn đến Quảng Ninh, ghé thăm quan bảo tàng Quảng Ninh, chụp ảnh tập thể tại bảo tàng.', loc: 'Quảng Ninh', note: '' },
        { time: '12:00', t: 'Ăn trưa tại nhà hàng địa phương.', ic: '🍽️', d: 'Ăn trưa ở nhà hàng địa phương.', loc: 'Quảng Ninh', note: '' },
        { time: '12:30', t: 'Đến khách sạn nhận phòng nghỉ ngơi.', ic: '🏨', d: 'Đến khách sạn nhận phòng nghỉ ngơi (giờ check-in thường từ 14-15h tuỳ khách sạn nhưng KS sẽ ưu tiên nhận phòng sớm nếu có phòng trống).', loc: 'Hạ Long', note: '' },
        { time: '15:30-17:00', t: 'Team Building tại bãi biển.', ic: '🎯', d: 'Tham gia team building tại bãi biển.', loc: 'Bãi biển', note: '' },
        { time: '18:30-19:00', t: 'Ăn tối và tự do khám phá Hạ Long.', ic: '🌃', d: 'Ăn tối tại nhà hàng địa phương, sau đó tự do khám phá Hạ Long về đêm.', loc: 'Hạ Long', note: '' }
      ]
    },
    {
      day: 'Ngày 2 (1/8-Thứ 7)', sub: 'FULL DAY VỊNH HẠ LONG → GALA DINNER', items: [
        { time: '07:00', t: 'Ăn sáng buffet tại khách sạn.', ic: '🌅', d: 'Dậy sớm ngắm bình minh và thưởng thức bữa sáng.', loc: 'Khách sạn', note: '' },
        { time: '08:00-15:00', t: 'Full day thăm quan Vịnh Hạ Long.', ic: '🛶', d: 'Cảng tàu quốc tế HL → Hang Sửng Sốt → Hang Luồn (chèo kayak/thuyền nan) → Đảo Titop → Cảng tàu HL.', loc: 'Vịnh Hạ Long', note: 'Kayak chi phí tự túc' },
        { time: '16:00', t: 'Quay lại KS nghỉ ngơi, chuẩn bị Gala.', ic: '💄', d: 'Quay lại khách sạn tắm rửa nghỉ ngơi, chuẩn bị cho tiệc tối.', loc: 'Khách sạn', note: '' },
        { time: '18:00-22:00', t: 'Gala Dinner.', ic: '🎆', d: 'Tham gia tiệc tối Gala Dinner tại nhà hàng ngoài khách sạn.', loc: 'Nhà hàng', note: 'Dress code' }
      ]
    },
    {
      day: 'Ngày 3 (2/8-Chủ Nhật)', sub: 'HẠ LONG → HÀ NỘI', items: [
        { time: '07:00', t: 'Ăn sáng tại khách sạn.', ic: '🍳', d: 'Ăn sáng tại khách sạn.', loc: 'Khách sạn', note: '' },
        { time: '08:00-11:00', t: 'Tự do nghỉ ngơi, tắm biển, mua sắm.', ic: '🏖️', d: 'Tự do nghỉ ngơi, tắm biển vui chơi, mua sắm.', loc: 'Hạ Long', note: '' },
        { time: '11:00', t: 'Trả phòng & ăn trưa.', ic: '🧹', d: 'Làm thủ tục trả phòng, sau đó đi ăn trưa tại nhà hàng địa phương.', loc: 'Hạ Long', note: '' },
        { time: '13:00', t: 'Lên xe về Hà Nội, dừng mua sắm hải sản.', ic: '🚌', d: 'Lên xe về Hà Nội, trên đường dừng xe cho đoàn mua sắm hải sản đặc sản Hạ Long.', loc: 'Hạ Long', note: '' },
        { time: '16:00', t: 'Về đến Hà Nội, kết thúc chuyến đi.', ic: '🏁', d: 'Về đến Hà Nội, kết thúc chuyến company trip đầy ý nghĩa. G2 hẹn gặp lại bạn trong chuyến đi tiếp theo!', loc: 'Hà Nội', note: '' }
      ]
    }
  ];

  const INCLUDES = [
    { ic: '🚌', t: '03 xe 45 chỗ đời mới' }, { ic: '🏨', t: '02 đêm KS 5 sao' },
    { ic: '🍽️', t: 'Các bữa ăn theo chương trình' }, { ic: '🎟️', t: 'Vé vui chơi khu du lịch Sunworld: tour đã đăng ký' },
    { ic: '🎯', t: 'Team Building' }, { ic: '🎆', t: 'Gala Dinner' },
    { ic: '🧑‍✈️', t: 'Hướng dẫn viên' }, { ic: '💧', t: 'Nước uống 2 chai/ngày' },
    { ic: '🧊', t: 'Overnight vui chơi tới bến với game (ma sói, chia lại lương,.."' }, { ic: '🛡️', t: 'Bảo hiểm du lịch' },
  ];

  // Phòng ở: tìm theo LDAP. Dữ liệu chính thức được lấy từ file Excel
  // Danh sách phòng.xlsx và lưu vào assets/rooms.json.
  // Định dạng: {ldap, name, room, members:[...], note}
  const FALLBACK_ROOMS = [
    { ldap: 'thnam4', name: 'Trần Hoài Nam', room: 'P.501', members: ['Trần Hoài Nam', 'Phạm Thế Khôi'], note: 'Tầng 5 · View biển' },
    { ldap: 'ptkhoi', name: 'Phạm Thế Khôi', room: 'P.501', members: ['Trần Hoài Nam', 'Phạm Thế Khôi'], note: 'Tầng 5 · View biển' },
    { ldap: 'vtdhien', name: 'Võ Thị Diệu Hiền', room: 'P.502', members: ['Võ Thị Diệu Hiền', 'Lưu Thị Ngân'], note: 'Tầng 5 · View hồ bơi' },
    { ldap: 'ltngan2', name: 'Lưu Thị Ngân', room: 'P.502', members: ['Võ Thị Diệu Hiền', 'Lưu Thị Ngân'], note: 'Tầng 5 · View hồ bơi' },
  ];
  let ROOMS = [...FALLBACK_ROOMS];
  const TEAM_ACTS = [
    {
      n: '01', e: '⚽', t: 'THÁCH THỨC KHÉO LÉO', rules: [
        'Luật chơiMỗi đội sẽ nhận được một 5 chiếc bánh quy. Các đội cử 5 thành viên khéo léo nhất. Đặt chiếc bánh quy lên trán rồi sử dụng sự khéo léo của mình đưa được bánh quy vào miệng. Đội nào thực hiện xong trước sẽ được nhận mật thư trước để giành lợi thế.',
        'Rèn luyện khả năng khéo léo của các thành viên.'
      ]
    },
    {
      n: '02', e: '🏃', t: 'THỬ THÁCH MỘC', rules: [
        'Mỗi đội sẽ nhận được một bộ 32 mảnh gỗ',
        'Các đội ghép 32 mảnh gỗ thành 1 cây cầu vững chắc nhất trong thời gian ngắn nhất. '
      ]
    },
    {
      n: '03', e: '🏃', t: 'THỬ THÁCH THỔ', rules: [
        'Mỗi lượt 1 thành viên di chuyển lên để vượt qua 1 hàng rào lưới,tìm các viên ngọc được chôn dưới đất, nếu tìm được đúng viên ngọc cùng màu áo với team mình thì lấy về.. ',
        ' Đội nào lấy được số viên ngọc nhiều nhất trong cùng thời gian quy định sẽ thắng '
      ]
    },
     {
      n: '04', e: '🏃', t: 'THỬ THÁCH KIM', rules: [
        'Mỗi lượt 2 thành viên cầm cung tên ngồi trên chiến mã cưỡi về đích rồi bắn tên vào mục tiêu phía trên. Sau 5 phút, đội nào bắn được nhiều mục tiêu hơn sẽ có điểm số cao hơn.  '
      ]
    },
     {
      n: '05', e: '🏃', t: 'THỬ THÁCH HỎA', rules: [
        'Trong 30 phút, tìm kiếm 10 tấm hình thu nhỏ BTC cung cấp và chụp lại góc hình tương tự thực tế. ',
        '  '
      ]
    },
     {
      n: '06', e: '🏃', t: 'THỬ THÁCH THUỶ', rules: [
        'Mỗi đội sẽ nhận được 3 chiếc gậy hơi, 4 thanh gỗ và những sợi dây buộc. Đội trưởng sẽ cầm trên tay 1 lá cờ mục tiêu và đi ra biển.' ,
        'Các đội dùng đạo cụ do BTC cung cấp để tạo thành 1 chiếc thuyền vững chắc chèo ra biển để mỗi đội lấy về 1 lá cờ mục tiêu và đón đội trưởng trở về. Sau khi lấy được. Đội trưởng sẽ ngồi lên thuyền, cầm trên tay lá cờ mục tiêu. Tất cả đồng đội nâng chiếc thuyền lên vai với đội trưởng ở trên và thật nhanh chạy về sân khấu. Đội về nhanh nhất sẽ giành chiến thắng.'
      ]
    },
  ];

  const TEAM_INFO = [
    { ic: '⏰', t: 'Thời gian', d: 'Chiều Ngày 1 · 15:30-17:00' },
    { ic: '🏖️', t: 'Địa điểm', d: 'Bãi biển Sunworld' },
    { ic: '🚩', t: 'Chia đội', d: 'Cả đoàn chia thành nhiều đội thi đấu' },
    { ic: '🏆', t: 'Giải thưởng', d: 'Trao thưởng đội xuất sắc tại Gala' },
    { ic: '👕', t: 'Trang phục', d: 'Áo đồng phục CMC' },
    { ic: '🎤', t: 'Dẫn dắt', d: 'MC & quản trò chuyên nghiệp' }
  ];

  const TEAM_AWARDS = [
    { rank: '1', t: 'Giải Nhất', d: 'Đội xuất sắc', c: '#FFD700' },
    { rank: '2', t: 'Giải Nhì', d: 'Đội năng động', c: '#C0C0C0' },
    { rank: '3', t: 'Giải Ba', d: 'Đội nhiệt huyết', c: '#CD7F32' }
  ];

  const GALA_AGENDA = [
    'Đón khách và ổn định chỗ ngồi',
    'Khai mạc chương trình',
    'Dùng tiệc tối',
    'Tham gia game và giải trí',
    'Giao lưu văn nghệ',
    'Bế mạc Gala Night'
  ];

  const RESTAURANTS = Array.from({ length: 9 }, (_, i) => ({ name: 'Quán ăn ' + (i + 1), d: 'BTC sẽ cập nhật thông tin & địa chỉ.' }));

      const NOIQUY = [
        { ic: '⏰', t: 'Đúng giờ', d: 'Tập trung và lên xe đúng giờ theo lịch trình, không để cả đoàn phải chờ.' },
        { ic: '🪪', t: 'Mang giấy tờ', d: 'Luôn mang theo CCCD/hộ chiếu bản gốc và giữ gìn cẩn thận.' },
        { ic: '🧑‍✈️', t: 'Theo hướng dẫn viên', d: 'Tuân thủ hướng dẫn của HDV và BTC tại mọi điểm tham quan.' },
        { ic: '🤝', t: 'Không tách đoàn', d: 'Không tự ý tách đoàn; báo BTC nếu cần đi riêng để được hỗ trợ.' },
        { ic: '🏊', t: 'An toàn khi tắm biển', d: 'Chỉ tắm ở khu vực cho phép, không bơi xa, tuân thủ cảnh báo.' },
        { ic: '🍺', t: 'Văn minh', d: 'Vui có chừng mực, không gây ồn ào ảnh hưởng người khác.' },
        { ic: '🌿', t: 'Giữ vệ sinh', d: 'Không xả rác, giữ gìn cảnh quan và tài sản nơi tham quan.' },
        { ic: '🎒', t: 'Tự bảo quản tư trang', d: 'Tự giữ tiền bạc, điện thoại; không để quên đồ trên xe/khách sạn.' },
        { ic: '🆘', t: 'Liên hệ khi cần', d: 'Có việc gấp hoặc sự cố, liên hệ ngay BTC hoặc bộ phận Y tế.' },
      ];

      const EXPLORE = [
        {
          t: 'Vịnh Hạ Long',
          badge: 'Di sản UNESCO',
          d: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ giữa làn nước xanh ngọc.',
          best: 'Bình minh hoặc hoàng hôn',
          tip: 'Chụp từ du thuyền để lấy toàn cảnh vịnh',
          fun: 'Là một trong những kỳ quan thiên nhiên nổi tiếng nhất châu Á.'
        },
        {
          t: 'Bãi Cháy',
          badge: 'Biển xanh',
          d: 'Bãi biển nổi tiếng của Hạ Long với bờ cát dài và không gian vui chơi sôi động.',
          best: '16–18h',
          tip: 'Canh lúc mặt trời lặn để có ảnh đẹp nhất',
          fun: 'Được cải tạo thành bãi biển nhân tạo lớn nhất khu vực.'
        },
        {
          t: 'Sun World Hạ Long',
          badge: 'Giải trí',
          d: 'Tổ hợp vui chơi hiện đại gồm cáp treo Nữ Hoàng, vòng quay Mặt Trời và công viên giải trí.',
          best: 'Chiều tối',
          tip: 'Lên vòng quay khi thành phố bắt đầu lên đèn',
          fun: 'Cáp treo từng giữ kỷ lục cabin sức chứa lớn nhất thế giới.'
        },
        {
          t: 'Cầu Bãi Cháy',
          badge: 'Biểu tượng',
          d: 'Cây cầu dây văng nổi tiếng nối đôi bờ Hạ Long.',
          best: 'Buổi tối',
          tip: 'Chụp từ ven biển để lấy toàn cảnh cầu phát sáng',
          fun: 'Từng là cầu dây văng một mặt phẳng dài nhất thế giới.'
        },
        {
          t: 'Bảo tàng Quảng Ninh',
          badge: 'Kiến trúc',
          d: 'Công trình kính đen độc đáo được ví như viên ngọc đen bên bờ vịnh.',
          best: 'Sáng hoặc chiều',
          tip: 'Chụp phản chiếu trên mặt kính rất đẹp',
          fun: 'Là một trong những công trình check-in nổi tiếng nhất Quảng Ninh.'
        },
        {
          t: 'Quảng trường 30/10',
          badge: 'Check-in',
          d: 'Không gian rộng lớn bên cạnh Bảo tàng Quảng Ninh, phù hợp cho hoạt động tập thể.',
          best: 'Chiều mát',
          tip: 'Chụp toàn cảnh cùng bảo tàng phía sau',
          fun: 'Thường diễn ra các sự kiện lớn của tỉnh.'
        },
        {
          t: 'Chợ Hạ Long',
          badge: 'Đặc sản',
          d: 'Điểm mua sắm nổi tiếng với hải sản khô, chả mực và quà địa phương.',
          best: 'Buổi sáng',
          tip: 'Mua chả mực giã tay làm quà',
          fun: 'Là khu chợ hải sản lớn nhất thành phố.'
        },
        {
          t: 'Phố cổ Bãi Cháy',
          badge: 'Sống ảo',
          d: 'Khu phố mang phong cách kiến trúc châu Âu kết hợp không khí biển.',
          best: 'Chiều tối',
          tip: 'Chụp khi đèn phố bắt đầu bật',
          fun: 'Được gọi vui là "Little Europe" của Hạ Long.'
        },
        {
          t: 'Cảng tàu Quốc tế Hạ Long',
          badge: 'Du thuyền',
          d: 'Cảng du lịch hiện đại nơi xuất phát các hành trình khám phá vịnh.',
          best: 'Sáng sớm',
          tip: 'Chụp cùng các du thuyền trắng trên nền vịnh',
          fun: 'Là một trong những cảng du lịch hiện đại nhất Việt Nam.'
        },
        {
          t: 'Marina Plaza',
          badge: 'View biển',
          d: 'Khu tổ hợp mua sắm và cà phê ven biển với góc nhìn đẹp ra vịnh.',
          best: 'Hoàng hôn',
          tip: 'Ngồi khu vực ngoài trời để săn ảnh sunset',
          fun: 'Được nhiều đoàn công ty chọn làm điểm thư giãn cuối ngày.'
        }
      ];
    const FOODS = [
      { t: 'Chả mực Hạ Long', d: 'Chả mực giã tay giòn dai thơm ngọt — đặc sản số 1 Quảng Ninh.', must: true },
      { t: 'Hải sản tươi sống', d: 'Tôm hùm, ghẹ, sò điệp, tu hài nướng ngay tại bàn.', must: true },
      { t: 'Sam biển nướng', d: 'Đặc sản quý hiếm của vùng biển Hạ Long, thịt ngọt bùi.', must: true },
      { t: 'Bánh cuốn chả mực', d: 'Bánh cuốn mỏng mềm ăn kèm chả mực giòn rụm.', must: false },
      { t: 'Gà đồi Tiên Yên', d: 'Gà thả đồi thịt chắc ngọt, nướng than hoa tuyệt vời.', must: false },
      { t: 'Hàu sữa Vân Đồn', d: 'Hàu sữa béo ngậy, nướng phô mai hoặc mỡ hành.', must: true }
    ];

    const FAQ = [
      { q: 'Mấy giờ tập trung khởi hành?', a: 'Đoàn tập trung và khởi hành lúc 09:15 ngày 31/07/2026 tại công ty. Vui lòng có mặt trước 15 phút.' },
      { q: 'Đoàn di chuyển bằng phương tiện gì?', a: '03 xe 45 chỗ đời mới cùng hướng dẫn viên V đồng hành suốt hành trình.' },
      { q: 'Khách sạn lưu trú ở đâu?', a: 'Khách sạn 5 sao tại Hạ Long, Quảng Ninh — 02 đêm, tiêu chuẩn 02 khách/phòng.https://royalhalonghotel.com/' },
      { q: 'Team Building diễn ra lúc nào?', a: 'Chiều Ngày 1 lúc 16:00-17:30 tại bãi biển, chủ đề "Kết Sức Mạnh – Nối Thành Công".' },
      { q: 'Gala Dinner nên mặc gì?', a: 'Dress code: Tự do, đẹp là được. BTC sẽ cập nhật tùy thời tiết.' },
      { q: 'Cần mang theo giấy tờ gì?', a: 'CCCD/hộ chiếu bản gốc, đồ bơi, kem chống nắng, thuốc cá nhân và một ít tiền mặt cho trường hợp cần chia lại kpi (chúng tôi không khuyến khích cá độ cờ bạc,..).' }
    ];

  const BTC = [
    { role: 'Ban tổ chức', name: 'Bùi Thị Bảo Ngọc', ldap: 'btbngoc@cmcglobal.vn', ph: '0707308154' },
    { role: 'Ban tổ chức', name: 'Lê Văn Đào', ldap: 'lvdao1@cmcglobal.vn', ph: '0984361797' },
    { role: 'Ban tổ chức', name: 'Trương Thị Ngọc Diệp', ldap: 'ttndiep8@cmcglobal.vn', ph: '0377849921' },
    
  ];

  async function loadWebItinerary() {
    try {
      const res = await fetch('assets/itinerary_web.json', {cache: 'no-cache'});
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        ITINERARY = data;
        console.log('Loaded external itinerary (assets/itinerary_web.json)');
      }
    } catch (e) {
      // ignore
    }
  }

  async function loadRooms() {
    const useRoomData = (data, source) => {
      if (!Array.isArray(data) || !data.length) return false;
      ROOMS = data.map(r => ({
        ...r,
        ldap: String(r.ldap || '').trim(),
        name: String(r.name || '').trim(),
        bus: String(r.bus || r.xe || '').trim(),
        room: String(r.room || '').trim(),
        members: Array.isArray(r.members) ? r.members : [],
        note: String(r.note || '').trim(),
      })).filter(r => r.ldap);
      if (!ROOMS.length) return false;
      console.log(`Loaded room list from ${source}`);
      return true;
    };

    try {
      const res = await fetch('assets/rooms.json', { cache: 'no-cache' });
      if (!res.ok) return;
      const data = await res.json();
      useRoomData(data, 'assets/rooms.json');
    } catch (e) {
      console.warn('Không tải được assets/rooms.json, dùng dữ liệu mặc định.', e);
      ROOMS = [...FALLBACK_ROOMS];
    }
  }

  /* ============ RENDER ============ */
  function renderCheckpoints() {
    const root = $('#checkpoints'); if (!root) return;
    CHECKPOINTS.forEach((c, i) => {
      const card = el('div', 'ck reveal');
      card.style.animationDelay = (i * 0.4) + 's';
      card.style.setProperty('--c', c.c);
      card.innerHTML = `
        <div class="num" style="background:${c.c}">${c.n}</div>
        <div class="ck-ic">${c.ic}</div>
        <h4>${c.t}</h4>
        <div class="lab">${c.lab}</div>
        <div class="pin"><div class="head" style="background:${c.c}"></div></div>`;
      card.addEventListener('click', () => { const tgt = $(CK_TARGETS[i]); if (tgt) tgt.scrollIntoView({ behavior: 'smooth' }); });
      root.appendChild(card);
    });
  }

  function renderItinerary() {
    const tabs = $('#dayTabs'), panels = $('#dayPanels'); if (!tabs) return;
    ITINERARY.forEach((day, di) => {
      const tab = el('button', 'day-tab' + (di === 0 ? ' active' : ''));
      tab.innerHTML = `${day.day}<span class="d-sub">${day.sub}</span>`;
      tab.addEventListener('click', () => {
        $$('.day-tab', tabs).forEach(t => t.classList.remove('active'));
        $$('.day-panel', panels).forEach(p => p.classList.remove('active'));
        tab.classList.add('active'); panels.children[di].classList.add('active');
      });
      tabs.appendChild(tab);

      const panel = el('div', 'day-panel' + (di === 0 ? ' active' : ''));
      const tl = el('div', 'timeline');
      day.items.forEach((it, ii) => {
        const item = el('div', 'tl-item' + (ii === 0 ? ' open' : ''));
        const meta = [
          `<span class="chip loc">📍 ${it.loc}</span>`,
          it.note ? `<span class="chip note">✦ ${it.note}</span>` : ''
        ].join('');
        item.innerHTML = `
          <div class="tl-dot">${it.ic}</div>
          <div class="tl-card">
            <div class="tl-head">
              <span class="tl-time">${it.time}</span>
              <span class="tl-title">${it.t}</span>
              <span class="tl-chev">⌄</span>
            </div>
            <div class="tl-body"><div class="tl-body-inner">${it.d}<div class="tl-meta">${meta}</div></div></div>
          </div>`;
        item.querySelector('.tl-head').addEventListener('click', () => item.classList.toggle('open'));
        tl.appendChild(item);
      });
      panel.appendChild(tl);
      panels.appendChild(panel);
    });
  }

  function renderIncludes() {
    const root = $('#includesGrid'); if (!root) return;
    INCLUDES.forEach(i => {
      const c = el('div', 'inc reveal');
      c.innerHTML = `<span class="ic">${i.ic}</span><div class="t">${i.t}</div>`;
      root.appendChild(c);
    });
  }

  function roomCardHTML(r) {
    const members = Array.isArray(r.members) ? r.members : [];
    const lis = members.map(m => {
      const me = m === r.name;
      return `<li><span class="av">${me ? '⭐' : '😎'}</span>${m}${me ? ' <b>(bạn)</b>' : ''}</li>`;
    }).join('');
    const bus = r.bus ? `<span class="gtag bus">Xe: ${r.bus}</span>` : '';
    const note = r.note || '';
    return `<div class="sticker">🛏️</div>
      <div class="rno">🛏️ ${r.room}</div>
      <span class="gtag nam">LDAP: ${r.ldap}</span>
      ${bus}
      <ul>${lis}</ul>
      <div class="rnote">${note}</div>`;
  }
  function renderRooms(filter = '') {
    const root = $('#roomsGrid'); if (!root) return;
    root.innerHTML = '';
    let f = (filter || '').trim().toLowerCase();
    if (f.includes('@')) f = f.split('@')[0];
    if (f.length < 2) { root.appendChild(el('div', 'no-result', '🔒 Nhập LDAP của bạn (vd: Hvan) để xem số xe bus, số phòng & danh sách bạn cùng phòng. LƯU Ý:số phòng ở đây không phải là số phòng thực tế, số phòng thực tế sẽ được cung cấp khi check in tại khách sạn.BTC không xử lý đổi phòng, các cá nhân có thể tự thương lượng và đổi phòng cho phù hợp với nhu cầu cá nhân. Các chi phí riêng phát sinh thêm trong phòng sẽ được các cá nhân thanh toán với khách sạn khi check out.')); return; }
    const list = ROOMS.filter(r => r.ldap.toLowerCase() === f);
    if (!list.length) { root.appendChild(el('div', 'no-result', '😅 Không tìm thấy LDAP này. Kiểm tra lại hoặc liên hệ BTC nhé!')); return; }
    list.forEach(r => { const c = el('div', 'room-card'); c.innerHTML = roomCardHTML(r); root.appendChild(c); });
  }

  function renderTeam() {
    const root = $('#tbGrid'); if (!root) return;
    TEAM_ACTS.forEach((a, i) => {
      const c = el('div', 'tb-card reveal');
      const rules = a.rules.map(r => `<li>${r}</li>`).join('');
      c.innerHTML = `
        <div class="tb-tag">THỬ THÁCH</div>
        <div class="tb-photo">
          <span class="tb-emoji">${a.e}</span>
          <img src="assets/img/tb-game-${i + 1}.jpg" alt="${a.t}" onerror="this.style.display='none'" />
        </div>
        <div class="tb-body">
          <div class="tb-no">${a.n}</div>
          <h3>${a.t}</h3>
          <div class="tb-luat">🎯 Luật chơi</div>
          <ul class="tb-rules">${rules}</ul>
        </div>`;
      root.appendChild(c);
    });
    const info = $('#tbInfo');
    if (info) TEAM_INFO.forEach(x => {
      const c = el('div', 'tb-info-card reveal');
      c.innerHTML = `<span class="tic-ic">${x.ic}</span><div><div class="tic-t">${x.t}</div><div class="tic-d">${x.d}</div></div>`;
      info.appendChild(c);
    });
    const aw = $('#tbAwards');
    if (aw) TEAM_AWARDS.forEach(a => {
      const c = el('div', 'award-card reveal');
      c.style.setProperty('--ac', a.c);
      c.innerHTML = `<div class="aw-medal">${a.rank}</div><div class="aw-rank">${a.t}</div><div class="aw-team">${a.d}</div><div class="aw-soon">⏳ Sắp công bố</div>`;
      aw.appendChild(c);
    });
  }

  function renderRules() {
    const root = $('#rulesGrid'); if (!root) return;
    NOIQUY.forEach((n, i) => {
      const c = el('div', 'rule-card reveal');
      c.innerHTML = `<span class="rule-no">${String(i + 1).padStart(2, '0')}</span><span class="rule-ic">${n.ic}</span><div class="rule-t">${n.t}</div><p class="rule-d">${n.d}</p>`;
      root.appendChild(c);
    });
  }

  function renderGala() {
    const root = $('#agendaList'); if (!root) return;
    const agenda = (typeof GALA_AGENDA !== 'undefined' && Array.isArray(GALA_AGENDA))
      ? GALA_AGENDA
      : [
          'Don khach va on dinh cho ngoi',
          'Khai mac chuong trinh',
          'Dung tiec toi',
          'Vinh danh va trao giai Team Building',
          'Giao luu van nghe',
          'Be mac Gala Night'
        ];
    agenda.forEach((a, i) => {
      const li = el('li', null, `<span class="an">${i + 1}</span><span>${a}</span>`);
      root.appendChild(li);
    });
  }

function renderExplore() {
  const root = $('#exGrid'); if (!root) return;
  EXPLORE.forEach((e, i) => {
    const c = el('div', 'ex-card reveal tilt');
    c.innerHTML = `
      <div class="ex-img"><div class="ex-badge">${e.badge}</div>
        <image-slot id="ex-${i}" src="ex-${i}.jpg" shape="rect" placeholder="Ảnh ${e.t}"></image-slot></div>
      <div class="ex-body">
        <h3>${e.t}</h3><p>${e.d}</p>
        <div class="ex-tips">
          <div class="et"><span class="k">⏰ Thời điểm đẹp:</span> ${e.best}</div>
          <div class="et"><span class="k">📸 Mẹo chụp:</span> ${e.tip}</div>
          <div class="et"><span class="k">💡 Fun fact:</span> ${e.fun}</div>
        </div></div>`;
    root.appendChild(c);
  });
  initTilt();
}
  function renderFood() {
  const root = $('#foodGrid'); if (!root) return;
  const stickers = ['🌴', '🥥', '🐚', '🍹', '🌺', '🏖️'];
  FOODS.forEach((f, i) => {
    const c = el('div', 'food-card reveal');
    c.innerHTML = `
      <div class="f-img">${f.must ? '<span class="must">⭐ Must try</span>' : ''}
        <image-slot id="food-${i}" src="assets/img/food-${i}.jpg" shape="rect" placeholder="Ảnh ${f.t}"></image-slot></div>
      <h3>${f.t}</h3><p>${f.d}</p><div class="sticker">${stickers[i % stickers.length]}</div>`;
    root.appendChild(c);
  });
}

  function renderFaq() {
    const root = $('#faqList'); if (!root) return;
    FAQ.forEach((f, i) => {
      const item = el('div', 'faq-item' + (i === 0 ? ' open' : ''));
      item.innerHTML = `
        <div class="faq-q"><span class="qm">?</span><h4>${f.q}</h4><span class="fc">+</span></div>
        <div class="faq-a"><div class="faq-a-in">${f.a}</div></div>`;
      item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
      root.appendChild(item);
    });
  }

  /* ============ COUNTDOWN ============ */
  function countdown() {
    const target = new Date('2026-07-31T07:30:00+07:00').getTime();
    const ids = { d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s') };
    if (!ids.d) return;
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      let diff = target - Date.now();
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / 86400000), h = Math.floor(diff % 86400000 / 3600000),
        m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000);
      ids.d.textContent = pad(d); ids.h.textContent = pad(h); ids.m.textContent = pad(m); ids.s.textContent = pad(s);
    }
    tick(); setInterval(tick, 1000);
  }

  /* ============ NAV scroll state + active link ============ */
  function navBehavior() {
    const nav = $('#nav');
    const links = $$('.nav-links a, .mobile-nav a');
    const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      const ref = window.innerHeight * 0.4;
      let cur = null;
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top <= ref && r.bottom > ref) cur = s;
      });
      if (!cur) {
        let best = Infinity;
        sections.forEach(s => { const r = s.getBoundingClientRect(); const d = ref - r.top; if (d >= 0 && d < best) { best = d; cur = s; } });
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = sections[sections.length - 1];
      links.forEach(a => a.classList.toggle('active', cur && a.getAttribute('href') === '#' + cur.id));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll); onScroll();
  }

  /* ============ Hạ Long weather forecast (Open-Meteo, no key) ============ */
  function wxMap(code) {
    if (code === 0) return { ic: '☀️' };
    if (code <= 2) return { ic: '🌤️' };
    if (code === 3) return { ic: '☁️' };
    if (code <= 48) return { ic: '🌫️' };
    if (code <= 57) return { ic: '🌦️' };
    if (code <= 67) return { ic: '🌧️' };
    if (code <= 77) return { ic: '🌨️' };
    if (code <= 82) return { ic: '🌧️' };
    if (code <= 86) return { ic: '🌨️' };
    return { ic: '⛈️' };
  }
  const WDAY = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
  function fetchWeather() {
    const days = $('#wxDays'), dateEl = $('#wxDate'); if (!days) return;
    const now = new Date();
    if (dateEl) dateEl.textContent = String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear();
    fetch('https://api.open-meteo.com/v1/forecast?latitude=13.10&longitude=109.30&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok&forecast_days=4')
      .then(r => r.json())
      .then(j => {
        const d = j && j.daily; if (!d || !d.time) throw 0;
        const n = Math.min(4, d.time.length);
        days.style.setProperty('--wxn', n);
        days.innerHTML = '';
        for (let i = 0; i < n; i++) {
          const dt = new Date(d.time[i] + 'T00:00:00');
          const name = i === 0 ? 'Hôm nay' : WDAY[dt.getDay()];
          const w = wxMap(d.weather_code[i]);
          const hi = Math.round(d.temperature_2m_max[i]);
          const lo = Math.round(d.temperature_2m_min[i]);
          const col = document.createElement('div'); col.className = 'wx-day';
          col.innerHTML = `<div class="wx-dname">${name}</div><div class="wx-dicon">${w.ic}</div>` +
            `<div class="wx-dtemp">${hi}<span>°</span></div><div class="wx-dnight">🌙 ${lo}°</div>`;
          days.appendChild(col);
        }
      })
      .catch(() => { days.innerHTML = '<div class="wx-loading">Chưa tải được dự báo Hạ Long 🌊</div>'; });
  }

  /* ============ song registration (Google Apps Script Centralized Storage) ============ */
  const SONG_KEY = 'g2_songs_v1';
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx1zSupRFdUQyad_xnj5PVGZ6dbMvN0SNSfVGflbRWPQO9GuBW8lB_PV-32Y0wR1u-2/exec';
  const SONG_SEED = [
    { ldap: 'vhdung', song: 'Việt Nam Ơi', t: Date.now() - 5400000 },
    { ldap: 'ldquan', song: 'Gánh mẹ', t: Date.now() - 1800000 },
  ];
  
  function esc(x) { return String(x).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c])); }
  function loadSongs() { try { const a = JSON.parse(localStorage.getItem(SONG_KEY)); return Array.isArray(a) ? a : SONG_SEED.slice(); } catch (e) { return SONG_SEED.slice(); } }
  function saveSongs(a) { try { localStorage.setItem(SONG_KEY, JSON.stringify(a.slice(0, 50))); } catch (e) { } }
  
  function renderSongList(arr) {
    const list = $('#songList'); if (!list) return;
    list.innerHTML = '';
    if (!arr || !arr.length) { list.appendChild(el('div', 'song-empty', 'Chưa có ai đăng ký — bạn mở màn nhé! 🎙️')); return; }
    arr.slice(0, 10).forEach(s => {
      const ini = (s.ldap || '?').charAt(0).toUpperCase();
      const col = COLORS[(s.ldap || '').length % COLORS.length];
      const it = el('div', 'song-item');
      it.innerHTML = `<span class="song-av" style="background:${col}">${ini}</span>
        <div class="song-meta"><div class="song-title">🎵 ${esc(s.song)}</div><div class="song-by">@${esc(s.ldap)}</div></div>`;
      list.appendChild(it);
    });
  }

  // Hàm lấy danh sách bài hát từ Google Apps Script về hiển thị công khai
  async function loadSongsFromServer() {
    try {
      const response = await fetch(`${WEB_APP_URL}?action=getSongs`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        saveSongs(data); // Lưu bản sao vào localStorage làm fallback cứu cánh
        renderSongList(data);
      } else if (Array.isArray(data)) {
        renderSongList([]);
      }
    } catch (e) {
      console.warn('Không thể tải từ Server, dùng localStorage tạm thời:', e);
      renderSongList(loadSongs());
    }
  }

  function flashBtn(form) {
    const b = form.querySelector('button'); if (!b) return; const o = b.textContent;
    b.textContent = 'Đã đăng ký! 🎉'; setTimeout(() => b.textContent = o, 1500);
  }

  function songInit() {
    const form = $('#songForm'); if (!form) return;
    const hint = $('#songHint');
    const btn = $('#songSubmit') || form.querySelector('button');

    if (hint) hint.textContent = '🌐 Đăng ký trực tuyến — tải lại trang là thấy ngay!';
    
    // 1. Khởi chạy: Tải danh sách từ Server về ngay khi load trang
    loadSongsFromServer();

    // 2. Cơ chế Auto-refresh: Cứ mỗi 5 giây tự động kéo data mới về để cập nhật danh sách ngầm
    setInterval(loadSongsFromServer, 5000);

    // 3. Xử lý sự kiện gửi Form Đăng ký
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let ldap = $('#songLdap').value.trim(); 
      let song = $('#songName').value.trim();
      
      if (ldap.includes('@')) ldap = ldap.split('@')[0];
      if (!ldap || !song) { 
        if (hint) hint.textContent = '⚠️ Nhập cả LDAP và tên bài hát nhé! 🙏'; 
        return; 
      }

      // Trạng thái đang gửi
      if (btn) { btn.disabled = true; btn.textContent = 'Đang gửi...'; }
      if (hint) hint.textContent = '⏳ Hệ thống đang ghi nhận...';

      try {
        // Gửi dữ liệu đồng bộ lên Google Apps Script
        await fetch(WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ldap, song, t: Date.now() })
        });

        // Xử lý Giao diện sau khi gửi thành công
        $('#songLdap').value = ''; 
        $('#songName').value = ''; 
        if (hint) hint.textContent = '✅ Đăng ký thành công! Bài hát của bạn đã được ghi nhận.';
        flashBtn(form);

        // Đợi 1 giây cho Server cập nhật dữ liệu xong thì chủ động reload lại list mới
        setTimeout(loadSongsFromServer, 1000);

      } catch (err) {
        if (hint) hint.textContent = '❌ Gửi thất bại, lỗi kết nối mạng. Vui lòng thử lại!';
        console.error('Lỗi khi submit bài hát:', err);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  /* ============ scroll-driven map bus ============ */
  function mapBus() {
    const path = $('#roadPath'), bus = $('#mapBus'), section = $('#roadmapSection');
    if (!path || !bus || !section) return;
    const len = path.getTotalLength();
    function update() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh - rect.top) / (rect.height + vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      const pt = path.getPointAtLength(p * len);
      const pt2 = path.getPointAtLength(Math.min(len, p * len + 1));
      const ang = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
      const svg = $('#roadSvg'); const w = svg.clientWidth, h = svg.clientHeight;
      const x = (pt.x / 1200) * w, y = (pt.y / 230) * h;
      bus.style.transform = `translate(${x - 37}px,${y - 32}px) rotate(${ang}deg)`;
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update); update();
  }

  /* ============ 3D tilt cards ============ */
  function initTilt() {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    $$('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  /* ============ reveal on scroll ============ */
  let _revealNodes = [];
  function inView(elm, margin) {
    const r = elm.getBoundingClientRect(); const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * (1 - (margin || 0.12)) && r.bottom > 0;
  }
  function revealObserver() {
    _revealNodes = $$('.reveal');
    const check = () => {
      _revealNodes = _revealNodes.filter(n => { if (inView(n)) { n.classList.add('in'); return false; } return true; });
      if (!_revealNodes.length) window.removeEventListener('scroll', check);
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
  }

  /* ============ gala lighting on scroll ============ */
  let _galaFired = false;
  function galaLight() {
    const g = $('#gala'); if (!g) return;
    const check = () => {
      const lit = inView(g, 0.3) && g.getBoundingClientRect().bottom > 0;
      g.classList.toggle('lit', lit);
      if (lit && !_galaFired) { _galaFired = true; fireworks(); }
      if (!lit) _galaFired = false;
    };
    window.addEventListener('scroll', check, { passive: true }); check();
  }
  function fireworks() {
    const g = $('#gala'); if (!g) return;
    const cols = ['#FFD700', '#FF6B6B', '#00AEEF', '#FF8A3D', '#fff', '#34C759'];
    for (let b = 0; b < 3; b++) {
      setTimeout(() => {
        const ox = 20 + Math.random() * 60, oy = 18 + Math.random() * 30;
        for (let i = 0; i < 18; i++) {
          const f = el('div', 'firework'); const ang = (i / 18) * Math.PI * 2, dist = 60 + Math.random() * 70;
          f.style.left = ox + '%'; f.style.top = oy + '%'; f.style.background = cols[Math.floor(Math.random() * cols.length)];
          g.appendChild(f);
          f.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 },
          {
            transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(0)`,
            opacity: 0
          }],
            {duration:900+Math.random()*400,easing:'cubic-bezier(.2,.7,.3,1)'});
          setTimeout(()=>f.remove(),1400);
        }
      },b*450);
    }
  }

  /* ============ confetti for team building ============ */
  function teamConfetti(){
    const t = $('#team'); if(!t) return;
    let fired=false;
    const check=()=>{ if(!fired && inView(t,0.3)){ fired=true; burstConfetti(t); window.removeEventListener('scroll',check);} };
    window.addEventListener('scroll',check,{passive:true}); check();
  }
  function burstConfetti(host){
    const cols=['#FF6B6B','#00AEEF','#34C759','#FFD93D','#FF8A3D'];
    for(let i=0;i<60;i++){
      const c=el('div','confetti');
      c.style.left=Math.random()*100+'%'; c.style.top='-20px';
      c.style.background=cols[Math.floor(Math.random()*cols.length)];
      c.style.opacity=1; host.appendChild(c);
      c.animate([{transform:`translateY(0) rotate(0)`,opacity:1},
        {transform:`translateY(${ 300+Math.random() * 300 }px) rotate(${ Math.random() * 720 }deg)`,opacity:0}],
        {duration:2200+Math.random()*1500,easing:'ease-in'});
      setTimeout(()=>c.remove(),3800);
    }
  }

  /* ============ sparkles on ocean ============ */
  function sparkles(){
    const ocean = $('.ocean'); if(!ocean) return;
    for(let i=0;i<14;i++){
      const s=el('div','sparkle');
      s.style.left=Math.random()*100+'%'; s.style.bottom=Math.random()*70+'%';
      s.style.animationDelay=(Math.random()*3)+'s';
      ocean.appendChild(s);
    }
  }

  /* ============ ocean wave sound (WebAudio, synthesized) ============ */
  let _oc=null, _ocGain=null, _ocStarted=false;
  function buildOcean(){
    const Ctx = window.AudioContext||window.webkitAudioContext; if(!Ctx) return false;
    _oc = new Ctx();
    const dur=5, sr=_oc.sampleRate, len=Math.floor(dur*sr);
    const buf=_oc.createBuffer(1,len,sr); const data=buf.getChannelData(0);
    let b=0;
    for(let i=0;i<len;i++){ const w=Math.random()*2-1; b=(b+0.02*w)/1.02; data[i]=b*3.2; }
    const src=_oc.createBufferSource(); src.buffer=buf; src.loop=true;
    const lp=_oc.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=520; lp.Q.value=0.6;
    const swell=_oc.createGain(); swell.gain.value=0.55;
    const lfo=_oc.createOscillator(); lfo.type='sine'; lfo.frequency.value=0.11;
    const lfoGain=_oc.createGain(); lfoGain.gain.value=0.35;
    lfo.connect(lfoGain); lfoGain.connect(swell.gain);
    const lfo2=_oc.createOscillator(); lfo2.type='sine'; lfo2.frequency.value=0.047;
    const lfo2Gain=_oc.createGain(); lfo2Gain.gain.value=0.12;
    lfo2.connect(lfo2Gain); lfo2Gain.connect(swell.gain);
    _ocGain=_oc.createGain(); _ocGain.gain.value=0;
    src.connect(lp); lp.connect(swell); swell.connect(_ocGain); _ocGain.connect(_oc.destination);
    src.start(); lfo.start(); lfo2.start();
    _ocStarted=true; return true;
  }
  function toggleOcean(on){
    if(!_ocStarted){ if(!buildOcean()) return; }
    if(_oc.state==='suspended') _oc.resume();
    const now=_oc.currentTime;
    _ocGain.gain.cancelScheduledValues(now);
    _ocGain.gain.setValueAtTime(_ocGain.gain.value, now);
    _ocGain.gain.linearRampToValueAtTime(on?0.7:0, now+(on?1.4:0.7));
  }

  /* ============ menu button → dropdown ============ */
  function menuToggle(){
    const btn=$('#menuBtn'); if(!btn) return;
    const links=[
      ['#hero','🏠 Trang chủ'],['#roadmapSection','🗺️ Hành trình'],['#itinerary','🗓️ Lịch trình'],
      ['#onbus','🚌 Trên xe'],['#hotel','🏨 Khách sạn'],['#team','🎯 Team Building'],
      ['#gala','🎆 Gala Night'],['#explore','📸 Điểm đến'],['#food','🍤 Ẩm thực'],
      ['#rules','📋 Nội quy'],['#faq','❓ Thông tin'],['#footer','🛟 Ban tổ chức'],
    ];
    const panel=el('div','menu-panel');
    panel.innerHTML=links.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join('');
    document.body.appendChild(panel);
    function place(){
      const r=btn.getBoundingClientRect();
      panel.style.top=(r.bottom+10)+'px';
      panel.style.right=(window.innerWidth-r.right)+'px';
    }
    function close(){ panel.classList.remove('open'); document.removeEventListener('click',onDoc,true); }
    function onDoc(e){ if(!panel.contains(e.target) && e.target!==btn){ close(); } }
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      if(panel.classList.contains('open')){ close(); return; }
      place(); panel.classList.add('open');
      setTimeout(()=>document.addEventListener('click',onDoc,true),0);
    });
    panel.addEventListener('click',e=>{
      const a=e.target.closest('a'); if(!a) return;
      e.preventDefault(); close();
      const t=$(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'});
    });
    window.addEventListener('resize',()=>{ if(panel.classList.contains('open')) place(); });
  }

  /* ============ music toggle ============ */
  const MUSIC_SOURCES = [
    'assets/music.mp3',
    'assets/summer.mp3',
    'assets/song.mp3',
    'assets/nhac.mp3',
    'assets/bgm.mp3',
    'assets/music.wav',
    'assets/music.ogg'
  ];
  let _musicAudio = null, _musicSourceIndex = 0, _musicFallbackOcean = false;

  function getMusicAudio(){
    if(_musicAudio) return _musicAudio;
    _musicAudio = new Audio(MUSIC_SOURCES[_musicSourceIndex]);
    _musicAudio.loop = true;
    _musicAudio.preload = 'auto';
    _musicAudio.volume = 0.78;
    _musicAudio.addEventListener('ended',()=>{ _musicAudio.currentTime = 0; });
    return _musicAudio;
  }

  async function playAssetMusic(){
    const audio = getMusicAudio();
    _musicFallbackOcean = false;
    while(_musicSourceIndex < MUSIC_SOURCES.length){
      try{
        audio.src = MUSIC_SOURCES[_musicSourceIndex];
        await audio.play();
        return true;
      }catch(e){
        _musicSourceIndex++;
      }
    }
    _musicFallbackOcean = true;
    toggleOcean(true);
    return false;
  }

  function stopAssetMusic(){
    if(_musicFallbackOcean){ toggleOcean(false); _musicFallbackOcean = false; }
    if(!_musicAudio) return;
    _musicAudio.pause();
    _musicAudio.currentTime = 0;
  }

  function musicToggle(){
    let on=false;
    $$('.js-music').forEach(btn=>btn.addEventListener('click',async()=>{
      on=!on;
      btn.classList.toggle('playing',on);
      btn.textContent = on?'🔊':'🔇';
      if(on) await playAssetMusic();
      else stopAssetMusic();
    }));
  }

  /* ============ easter egg: click logo 7x ============ */
  function easterEgg(){
    const logo=$('#logo'), overlay=$('#eggOverlay'), bus=$('#eggBus'), close=$('#eggClose');
    if(!logo) return; let n=0,timer;
    logo.addEventListener('click',()=>{
      n++; clearTimeout(timer); timer=setTimeout(()=>n=0,1500);
      if(n>=7){ n=0; overlay.classList.add('show'); }
      else { window.scrollTo({top:0,behavior:'smooth'}); }
    });
    close.addEventListener('click',()=>{ overlay.classList.remove('show'); bus.classList.remove('run'); void bus.offsetWidth; bus.classList.add('run'); });
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.classList.remove('show'); });
  }

  /* ============ CTA buttons ============ */
  function ctas(){
    // Event delegation: handle any click on elements with data-scroll attribute
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-scroll]');
      if (!btn) return;
      const selector = btn.dataset.scroll;
      const target = $(selector);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function renderBtc(){
    const root = $('#btcGrid'); if(!root) return;
    BTC.slice(0,3).forEach((b,i)=>{
      const c = el('div','btc-card reveal'+(b.upd?' upd':''));
      if(b.upd){
        c.innerHTML = `
          <div class="btc-ph-av">👤</div>
          <div class="role">${b.role}</div>
          <div class="nm">${b.name}</div>
          <div class="upd-tag">🔄 Thông tin sẽ được cập nhật</div>`;
      } else {
        c.innerHTML = `
          <image-slot id="btc-${i}" shape="circle" placeholder="Avatar"></image-slot>
          <div class="role">${b.role}</div>
          <div class="nm">${b.name}</div>
          <a class="ldap" href="mailto:${b.ldap}">✉️ ${b.ldap}</a>
          ${ b.ph ? `<div class="ph">📞 ${b.ph}</div>` : '' }`;
      }
      root.appendChild(c);
    });
  }

  function hotelSlider(){
    const gallery = $('.hotel-gallery'); if(!gallery) return;
    const imgs = Array.from({length:10},(_,i)=>`assets/img/hotel-${i+1}.jpg`);
    let cur = 0;

    gallery.innerHTML = `
      <div class="hotel-slide">
        <img class="hotel-slide-img" alt="Anh khach san" loading="lazy" decoding="async">
        <button class="hotel-arrow hotel-prev" type="button" aria-label="Anh truoc">‹</button>
        <button class="hotel-arrow hotel-next" type="button" aria-label="Anh tiep theo">›</button>
        <div class="hotel-dots" aria-hidden="true"></div>
      </div>`;

    const img = $('.hotel-slide-img', gallery);
    const dots = $('.hotel-dots', gallery);
    imgs.forEach((_,i)=>{
      const dot = el('span','hotel-dot');
      if(i===0) dot.classList.add('active');
      dots.appendChild(dot);
    });
    const dotEls = $$('.hotel-dot', gallery);

    function show(next){
      cur = (next + imgs.length) % imgs.length;
      img.src = imgs[cur];
      dotEls.forEach((d,i)=>d.classList.toggle('active', i===cur));
    }

    $('.hotel-prev', gallery).addEventListener('click',()=>show(cur-1));
    $('.hotel-next', gallery).addEventListener('click',()=>show(cur+1));
    dotEls.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
    show(0);
  }

  /* ============ init ============ */
  document.addEventListener('DOMContentLoaded', async ()=>{
    await loadWebItinerary();
    await loadRooms();
    renderCheckpoints(); renderItinerary(); renderIncludes(); renderRooms();
    renderTeam(); renderGala(); renderExplore(); renderFood(); renderRules(); renderFaq(); renderBtc();
    hotelSlider();
    countdown(); navBehavior(); mapBus(); galaLight(); teamConfetti(); sparkles();
    musicToggle(); easterEgg(); ctas(); fetchWeather(); songInit(); menuToggle();
    const search=$('#roomSearch'); if(search) search.addEventListener('input',e=>renderRooms(e.target.value));
    revealObserver();
  });
})();