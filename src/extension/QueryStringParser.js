class QueryStringParser {
  /**
   * 쿼리스트링 데이터(string) 삽입
   *
   * @param qs
   */
  constructor(qs = "") {
    this.querystring = qs;
    this.obj = {};
  }

  /**
   * 쿼리스트링 데이터 파싱
   */
  parse() {
    if (!this.querystring) {
      this.querystring = "";
      return;
    }
    const qs =
      this.querystring?.indexOf("?") === -1
        ? this.querystring
        : this.querystring.substring(1, this.querystring.length);
    const split = qs.split("&");
    const nameResult = {};
    split.forEach((args) => {
      let _args = args;
      let _name = "";
      let _value = "";
      const index = _args.indexOf("=", 0);

      // 이름 위치 설정
      if (index === -1) _name = _args;
      else _name = _args.substring(0, index);

      _value =
        index !== -1
          ? decodeURIComponent(_args.substring(index + 1, _args.length))
          : "";

      const nameMerge = {};

      // 만약 이름이 배열이라면???
      // 만약 key가 배열 형태인 경우
      if (_name.includes("[]")) {
        const _realName = _name.replace("[]", "");
        if (!this.obj[decodeURIComponent(_realName)])
          this.obj[decodeURIComponent(_realName)] = {};
        Object.assign(this.obj[decodeURIComponent(_realName)], { 0: _value });
      }
      // 만약 key가 객체 형태인 경우
      else if (_name.includes("[") && _name.includes("]")) {
        // const startIndex = _name.indexOf("[");
        // const endIndex = _name.indexOf("]");
        // const _realName = _name.substring(0, startIndex);
        // const propName = _name.substring(startIndex + 1, endIndex);
        // if (!this.obj[decodeURIComponent(_realName)]) {
        //   this.obj[decodeURIComponent(_realName)] = {};
        // }
        // this.obj[decodeURIComponent(_realName)][propName] = _value;
        const keys = _name.split(/[\[\]]/).filter(Boolean); // 대괄호를 기준으로 키를 분리
        let obj = this.obj;
        for (let i = 0; i < keys.length; i++) {
          const currentKey = keys[i];
          if (i === keys.length - 1) {
            obj[currentKey] = _value;
          } else {
            if (!obj[currentKey]) obj[currentKey] = {};
            obj = obj[currentKey];
          }
        }
      } else {
        this.obj[decodeURIComponent(_name)] = _value;
      }
    });
  }

  /**
   * 쿼리스트링 내에 데이터 삽입
   *
   * @param name      인덱스명
   * @param value     데이터 값 (스트링)
   */
  set(name = "", value = "") {
    const _name = decodeURIComponent(name);
    this.obj[_name] = value;
  }

  /**
   * 쿼리스트링 배열의 제거
   *
   * @param name     배열 인덱스명
   */
  remove(name = "") {
    const _name = decodeURIComponent(name);
    delete this.obj[_name];
  }

  /**
   * 쿼리스트링 배열의 반환(얻기)
   *
   * @returns {*|{}} 쿼리스트링 배열
   */
  get() {
    return this.obj;
  }

  /**
   * 쿼리스트링 배열 문자로 변환
   *
   * @returns {string}
   */
  stringify() {
    let data = "?";
    let keys = Object.keys(this.obj);
    keys.map((value) => {
      data += data === "?" ? "" : "&";
      data += `${encodeURIComponent(value)}=${encodeURIComponent(this.obj[value])}`;
    });
    return data;
  }
}

module.exports = QueryStringParser;
