import DOMMatrix from '../../src/classes/DOMMatrix';

describe('DOMMatrix class', () => {
  it('should accept no parameters', () => {
    const matrix = new DOMMatrix();
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should construct a 2d matrix properly', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    expect(matrix.a).toBe(1);
    expect(matrix.b).toBe(2);
    expect(matrix.c).toBe(3);
    expect(matrix.d).toBe(4);
    expect(matrix.e).toBe(5);
    expect(matrix.f).toBe(6);
  });

  it('should be a 3d matrix if constructed without a parameter', () => {
    const matrix = new DOMMatrix();
    expect(matrix.is2D).toBeFalsy();
  });

  it('should throw for invalid parameter length', () => {
    expect(() => new DOMMatrix([1])).toThrow();
  });

  it('should accept an array of 6 length', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should accept an array of 16 length', () => {
    const matrix = new DOMMatrix([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ]);
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should return Float32Array', () => {
    const matrix32 = new DOMMatrix().toFloat32Array();
    expect(matrix32).toBeInstanceOf(Float32Array);
    expect(matrix32).toStrictEqual(
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    );
  });

  it('should return Float64Array', () => {
    const matrix64 = new DOMMatrix().toFloat64Array();
    expect(matrix64).toBeInstanceOf(Float64Array);
    expect(matrix64).toStrictEqual(
      new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    );
  });

  it('should know if a 2d matrix is an identity matrix', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    expect(matrix.isIdentity).toBeTruthy();
  });

  it('should know if a 2d matrix is not an identity matrix', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    expect(matrix.isIdentity).toBeFalsy();
  });

  it('should know if a 3d matrix is an identity matrix', () => {
    const matrix = new DOMMatrix();
    expect(matrix.isIdentity).toBeTruthy();
  });

  it('should know if a 3d matrix is not an identity matrix', () => {
    const matrix = new DOMMatrix();
    matrix.m21 = 100;
    expect(matrix.isIdentity).toBeFalsy();
  });

  it('should set the m11 value when the a value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.a = 2;
    expect(matrix.m11).toBe(2);
  });

  it('should return the m11 value when the a property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m11 = 2;
    expect(matrix.a).toBe(2);
  });

  it('should set the m12 value when the b value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.b = 2;
    expect(matrix.m12).toBe(2);
  });

  it('should return the m12 value when the b property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m12 = 2;
    expect(matrix.b).toBe(2);
  });

  it('should set the m21 value when the c value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.c = 2;
    expect(matrix.m21).toBe(2);
  });

  it('should return the m21 value when the c property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m21 = 2;
    expect(matrix.c).toBe(2);
  });

  it('should set the m22 value when the d value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.d = 2;
    expect(matrix.m22).toBe(2);
  });

  it('should return the m22 value when the d property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m22 = 2;
    expect(matrix.d).toBe(2);
  });

  it('should set the m41 value when the e value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.e = 2;
    expect(matrix.m41).toBe(2);
  });

  it('should return the m41 value when the e property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m41 = 2;
    expect(matrix.e).toBe(2);
  });

  it('should set the m42 value when the f value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.f = 2;
    expect(matrix.m42).toBe(2);
  });

  it('should return the m42 value when the f property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m42 = 2;
    expect(matrix.f).toBe(2);
  });

  describe(`translate`, function () {
    it(`should return a new DOMMatrix instance`, function () {
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.translate(100, 100);
      expect(translatedMatrix instanceof DOMMatrix).toBeTruthy();
      expect(translatedMatrix === matrix).toBeFalsy();
    });

    it(`should apply 2d changes`, function () {
      const x = 100;
      const y = 200;
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.translate(x, y);
      expect(translatedMatrix.e).toEqual(x + matrix.m11);
      expect(translatedMatrix.f).toEqual(y + matrix.m22);
    });

    it(`should apply 3d changes`, function () {
      const x = 100;
      const y = 200;
      const z = 300;
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.translate(x, y, z);
      expect(translatedMatrix.m41).toEqual(x + matrix.m11);
      expect(translatedMatrix.m42).toEqual(y + matrix.m22);
      expect(translatedMatrix.m43).toEqual(z + matrix.m33);
    });
  });

  describe(`scale`, function () {
    it(`should return a new DOMMatrix instance`, function () {
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.scale(0.5, 0.7);
      expect(translatedMatrix instanceof DOMMatrix).toBeTruthy();
      expect(translatedMatrix === matrix).toBeFalsy();
    });

    it(`should apply 2d changes`, function () {
      const scaleX = 0.75;
      const scaleY = 0.5;
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.scale(scaleX, scaleY);
      expect(translatedMatrix.a).toEqual(scaleX);
      expect(translatedMatrix.d).toEqual(scaleY);
    });
  });
});
