def convex_hull(points):
  # Find the leftmost point
  start = min(points)

  # Initialize the result list with the starting point
  result = [start]

  # Set the current point to the starting point
  current = start

  while True:
    # Set the next point to be None
    next = None

    # Find the point that is furthest clockwise from the current point
    for p in points:
      if p == current:
        continue
      elif next is None:
        next = p
      else:
        # Use the cross product to determine which point is further clockwise
        cross = (current[0] - next[0]) * (p[1] - current[1]) - (current[1] - next[1]) * (p[0] - current[0])
        if cross > 0:
          next = p

    # Add the next point to the result list
    result.append(next)

    # Set the current point to be the next point
    current = next

    # If the current point is the starting point, we are done
    if current == start:
      break

  return result

# Example usage
points = [(0, 0), (5, 5), (5, 0), (0, 5), (2, 2)]
hull = convex_hull(points)
print(hull)
