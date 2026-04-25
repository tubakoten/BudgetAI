// src/layers/business/alertService.js

export const ALERT_LEVELS = {
    NONE:    { level: 'none',    threshold: 0    },
    WARNING: { level: 'warning', threshold: 0.80 }, // Sarı alarm: %80
    DANGER:  { level: 'danger',  threshold: 1.00 }, // Kırmızı: limit aşıldı
  };
  
  /**
   * Bütçe kullanım oranına göre uyarı seviyesi döner.
   * @param {number} usageRatio - 0-1 arası kullanım oranı
   * @returns {{ level: string, message: string }}
   */
  export function getAlertLevel(usageRatio) {
    if (usageRatio >= ALERT_LEVELS.DANGER.threshold) {
      return { level: 'danger', message: 'Aylık bütçeniz aşıldı!' };
    }
    if (usageRatio >= ALERT_LEVELS.WARNING.threshold) {
      const pct = Math.round(usageRatio * 100);
      return { level: 'warning', message: `Harcamalar limitin %${pct}'ine ulaştı.` };
    }
    return { level: 'none', message: '' };
  }