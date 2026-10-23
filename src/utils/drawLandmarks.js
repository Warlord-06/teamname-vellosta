/**
 * SignBridge - Hand Landmark Canvas Drawing Utilities
 * Renders glowing hand skeleton, joints, and bounding boxes over live video feed.
 */

export const HAND_CONNECTIONS = [
  // Palm base
  [0, 1], [0, 5], [5, 9], [9, 13], [13, 17], [0, 17],
  // Thumb
  [1, 2], [2, 3], [3, 4],
  // Index
  [5, 6], [6, 7], [7, 8],
  // Middle
  [9, 10], [10, 11], [11, 12],
  // Ring
  [13, 14], [14, 15], [15, 16],
  // Pinky
  [17, 18], [18, 19], [19, 20]
];

// Color palette for anatomical finger groups
const FINGER_COLORS = {
  palm: '#818CF8',       // Indigo 400
  thumb: '#F59E0B',      // Amber 500
  index: '#38BDF8',      // Sky 400
  middle: '#34D399',     // Emerald 400
  ring: '#A78BFA',       // Violet 400
  pinky: '#F472B6',      // Pink 400
  joint: '#FFFFFF'
};

function getFingerGroup(pointIndex) {
  if (pointIndex === 0) return 'palm';
  if (pointIndex <= 4) return 'thumb';
  if (pointIndex <= 8) return 'index';
  if (pointIndex <= 12) return 'middle';
  if (pointIndex <= 16) return 'ring';
  return 'pinky';
}

/**
 * Draws all detected hand landmarks on HTML5 Canvas
 */
export function renderHandsOnCanvas(ctx, handsLandmarks, handednesses = [], options = {}) {
  const {
    mirrored = true,
    showBoundingBox = true,
    showHandedness = true,
    activeSign = null
  } = options;

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // Clear previous frame
  ctx.clearRect(0, 0, width, height);

  if (!handsLandmarks || handsLandmarks.length === 0) return;

  handsLandmarks.forEach((landmarks, handIndex) => {
    if (!landmarks || landmarks.length < 21) return;

    const handedness = handednesses[handIndex]?.[0]?.categoryName || `Hand ${handIndex + 1}`;
    const handScore = handednesses[handIndex]?.[0]?.score 
      ? Math.round(handednesses[handIndex][0].score * 100) 
      : 95;

    // Helper to map normalized coordinates (0..1) to canvas pixels
    const toScreen = (lm) => {
      const x = mirrored ? (1 - lm.x) * width : lm.x * width;
      const y = lm.y * height;
      return { x, y, z: lm.z };
    };

    const screenPoints = landmarks.map(toScreen);

    // Calculate bounding box
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;

    screenPoints.forEach(pt => {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    });

    // Add padding to bounding box
    const padding = 20;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(width, maxX + padding);
    maxY = Math.min(height, maxY + padding);

    // 1. Draw glowing bones / connections
    HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = screenPoints[startIdx];
      const end = screenPoints[endIdx];

      const fingerGroup = getFingerGroup(endIdx);
      const strokeColor = FINGER_COLORS[fingerGroup] || '#6366F1';

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);

      // Glow effect
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();
    });

    // 2. Draw landmark joints
    screenPoints.forEach((pt, idx) => {
      const isTip = [4, 8, 12, 16, 20].includes(idx);
      const isWrist = idx === 0;
      const fingerGroup = getFingerGroup(idx);
      const jointColor = FINGER_COLORS[fingerGroup];

      ctx.save();
      ctx.beginPath();
      const radius = isTip ? 6.5 : isWrist ? 5.5 : 4.5;
      ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);

      ctx.shadowColor = jointColor;
      ctx.shadowBlur = 10;
      ctx.fillStyle = isTip ? '#FBBF24' : FINGER_COLORS.joint;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = jointColor;
      ctx.stroke();
      ctx.restore();
    });

    // 3. Draw bounding box and label
    if (showBoundingBox) {
      ctx.save();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
      ctx.restore();
    }

    if (showHandedness) {
      ctx.save();
      const labelText = `${handedness} (${handScore}%)`;
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      const textWidth = ctx.measureText(labelText).width;
      
      const badgeX = minX;
      const badgeY = Math.max(22, minY - 8);

      // Badge background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY - 18, textWidth + 16, 22, 6);
      ctx.fill();

      // Badge border
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Badge text
      ctx.fillStyle = '#E0E7FF';
      ctx.fillText(labelText, badgeX + 8, badgeY - 3);
      ctx.restore();
    }
  });

  // 4. If an active sign is detected with high confidence, show on-canvas banner
  if (activeSign && activeSign.name && activeSign.confidence > 0.6) {
    ctx.save();
    const bannerText = `Recognized: ${activeSign.name} (${Math.round(activeSign.confidence * 100)}%)`;
    ctx.font = 'bold 15px Inter, system-ui, sans-serif';
    const bannerWidth = ctx.measureText(bannerText).width + 32;
    const bannerHeight = 36;
    const bannerX = (width - bannerWidth) / 2;
    const bannerY = height - 48;

    // Glowing pill background
    ctx.shadowColor = 'rgba(79, 70, 229, 0.6)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 18);
    ctx.fill();

    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dot
    ctx.beginPath();
    ctx.arc(bannerX + 16, bannerY + bannerHeight / 2, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#10B981';
    ctx.shadowColor = '#10B981';
    ctx.shadowBlur = 8;
    ctx.fill();

    // Text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(bannerText, bannerX + 28, bannerY + 23);
    ctx.restore();
  }
}
