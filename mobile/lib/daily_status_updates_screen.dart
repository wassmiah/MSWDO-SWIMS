import 'package:flutter/material.dart';
import 'custom_app_bar.dart'; // Ensure this import

class DailyStatusUpdatesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Daily Status Updates',
        hasNotifications: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 16),
            Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
              color: Color.fromARGB(255, 212, 208, 208),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Announcement from Admin:',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sit amet lorem at gravida. Duis a leo sem. Ut non tortor consectetur, consequat nibh nec, ullamcorper dui.',
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16.0,
                mainAxisSpacing: 16.0,
                children: [
                  _buildStatusUpdateItem(
                    context,
                    icon: Icons.assignment,
                    label: 'Assigned Tasks',
                    onTap: () {
                      Navigator.pushNamed(context, '/assigned-tasks');
                    },
                  ),
                  _buildStatusUpdateItem(
                    context,
                    icon: Icons.update,
                    label: 'Case Updates',
                    onTap: () {
                      Navigator.pushNamed(context, '/case-updates');
                    },
                  ),
                  _buildStatusUpdateItem(
                    context,
                    icon: Icons.check_circle,
                    label: 'Approved Cases',
                    onTap: () {
                      Navigator.pushNamed(context, '/approved-cases');
                    },
                  ),
                  _buildStatusUpdateItem(
                    context,
                    icon: Icons.pending,
                    label: 'Pending Approvals',
                    onTap: () {
                      Navigator.pushNamed(context, '/pending-approvals');
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusUpdateItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required Function() onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          color: Colors.orange,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 40, color: Colors.white),
            SizedBox(height: 10),
            Text(
              label,
              style: TextStyle(fontSize: 16, color: Colors.white),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
